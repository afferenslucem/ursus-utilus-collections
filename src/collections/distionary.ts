import { DictionaryException } from "../exceptions/dictionary-exceptions";
import { IEqualityComparer } from "../interfaces/i-equality-comparer";
import { DefaultEqualityComparer } from "../utils/abstract-equlity-comparer";
import { hasIn } from "lodash";

export class Dictionary<TKey, TValue> {
    private storage: { [id: string] : Array<[TKey, TValue]> } = {};

    private comparer: IEqualityComparer<TKey>;

    public constructor(comparer?: IEqualityComparer<TKey>) {
        this.comparer = comparer || new DefaultEqualityComparer();
    }

    /**
     * Adds new pair to storage
     * @param key Key for add
     * @param value Value for add
     * @throws 'Value with this key already exists' if You try insert value with dublicate key
     */
    public add(key: TKey, value: TValue): void {
        const hash = this.comparer.getHashCode(key);

        const saved = this.storage[hash];

        if (saved) {
            const index = this.searchIndexForKey(key, saved);

            if(index == -1) {
                saved.push([key, value]);
            } else {
                throw DictionaryException.KeyAlreadyExists
            }
        } else {
            this.storage[hash] = [[key, value]];
        }
    }

    /**
     * Adds new pair to storage if pair with specified key does not exists
     * @param key Key for add
     * @param value Value for add
     */
    public addIfNotExists(key: TKey, value: TValue): void {
        if(this.contains(key)) {
            return;
        } else {
            this.add(key, value);
        }
    }

    /**
     * Updates value in pair with same key
     * @param key Key for update
     * @param value Value for update
     * @throws 'Value with this key does not exist' if You try update value for non existing key
     */
    public update(key: TKey, value: TValue): void {
        const hash = this.comparer.getHashCode(key);

        const saved = this.storage[hash];

        if (saved) {
            const index = this.searchIndexForKey(key, saved);

            if(index == -1) {
                throw DictionaryException.KeyDoesNotExists
            } else {
                saved[index][1] = value;
            }
        } else {
            throw DictionaryException.KeyDoesNotExists
        }
    }

    /**
     * Updates value in pair with same key if key exists, otherwise add new pair
     * @param key Key for add/update
     * @param value Value for add/update
     */
    public addOrUpdate(key: TKey, value: TValue): void {
        const hash = this.comparer.getHashCode(key);

        const saved = this.storage[hash];

        if (saved) {
            const index = this.searchIndexForKey(key, saved);

            if(index == -1) {
                saved.push([key, value])
            } else {
                saved[index][1] = value;
            }
        } else {
            this.storage[hash] = [[key, value]];
        }
    }

    /**
     * Returns value for specified key
     * @param key Key for search
     * @throws 'Value with this key does not exist' if You try get value for non existing key
     */
    public get(key: TKey): TValue {
        const saved = this.tryGet(key)

        if (!saved) {
            throw DictionaryException.KeyDoesNotExists
        } else {
            return saved;
        }
    }

    /**
     * Returns value for specified key if exists, otherwise returns undefined
     * @param key Key for search
     */
    public tryGet(key: TKey): TValue | undefined {
        const hash = this.comparer.getHashCode(key);

        const saved = this.storage[hash];

        if (!saved) {
            return undefined;
        } else {
            const index = this.searchIndexForKey(key, saved);

            if(index == -1) {
                return undefined;
            } else {
                return saved[index][1];
            }
        }
    }

    /**
     * Removes value for specified key
     * @param key Key for search
     * @throws 'Value with this key does not exist' if You try remove value for non existing key
     */
    public remove(key: TKey): void {
        const hash = this.comparer.getHashCode(key);

        const saved = this.storage[hash];

        if (!saved) {
            throw DictionaryException.KeyDoesNotExists
        } else {
            const idx = this.searchIndexForKey(key, saved);

            if(idx == -1) {
                throw DictionaryException.KeyDoesNotExists;
            } else {
                this.storage[hash] = saved.filter((item, index) => index !== idx)
            }
        }
    }

    /**
     * Returns array with key/value tuples
     */
    public entries(): Array<[TKey, TValue]> {
        const arrays = Object.entries(this.storage).map((item) => item[1])

        return ([] as Array<[TKey, TValue]>).concat(...arrays);
    }

    /**
     * Check existing of key
     * @param key Key for check
     */
    public contains(key: TKey): boolean {
        const hash = this.comparer.getHashCode(key);

        const batch = this.storage[hash];

        if(!batch) return false;

        return this.searchIndexForKey(key, batch) !== -1;
    }

    /**
     * Removes all pairs
     */
    public clear(): void {
        this.storage = {};
    }

    private searchIndexForKey(key: TKey, batch: Array<[TKey, TValue]>): number {
        for(let i = 0, len = batch.length; i < len; i++) {
            if(this.comparer.equal(key, batch[i][0])) {
                return i;
            }
        }

        return -1;
    }
        
    /**
     * Returns count of key/value pairs
     */
    public get count(): number {
        return Object.values(this.storage).reduce((acc, item) => acc + item.length, 0);
    }
}