import { DictionaryException } from "../exceptions/dictionary-exceptions";
import { IEqualityComparer } from "../interfaces/i-equality-comparer";
import { DefaultEqualityComparer } from "../utils/abstract-equlity-comparer";

export class Dictionary<TKey, TValue> {
    private storage: { [id: string] : Array<[TKey, TValue]> } = {};

    private comparer: IEqualityComparer<TKey>;

    public constructor(comparer?: IEqualityComparer<TKey>) {
        this.comparer = comparer || new DefaultEqualityComparer();
    }

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

    public get(key: TKey): TValue {
        const saved = this.tryGet(key)

        if (!saved) {
            throw DictionaryException.KeyDoesNotExists
        } else {
            return saved;
        }
    }

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

    public entries(): Array<[TKey, TValue]> {
        return Object.entries(this.storage).reduce((acc, item) => acc.concat(item[1]), [] as Array<[TKey, TValue]>)
    }

    private searchIndexForKey(key: TKey, batch: Array<[TKey, TValue]>): number {
        for(let i = 0, len = batch.length; i < len; i++) {
            if(this.comparer.equal(key, batch[i][0])) {
                return i;
            }
        }

        return -1;
    }
}