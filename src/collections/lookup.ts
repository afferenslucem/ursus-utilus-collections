import { IEqualityComparer } from "../interfaces/i-equality-comparer";
import { ILookup } from "../interfaces/i-lookup";
import { Dictionary } from "./distionary";
import { MapCondition } from "../delegates";

export class Lookup<TSource, TKey, TValue> implements ILookup<TKey, TValue> {
    private storage: Dictionary<TKey, TValue[]>;

    public constructor(items: TSource[], keySelector: MapCondition<TSource, TKey>, valueSelector?: MapCondition<TSource, TValue>, comparer?: IEqualityComparer<TKey>) {
        this.storage = new Dictionary<TKey, TValue[]>(comparer);

        this.fillStorage(items, keySelector, valueSelector);
    }

    private fillStorage(items: TSource[], keySelector: MapCondition<TSource, TKey>, valueSelector?: MapCondition<TSource, TValue>): void {
        // @ts-ignore
        valueSelector = valueSelector || (a => a) as MapCondition<TSource, TValue>;

        for(let i = 0, len = items.length; i < len; i++) {
            const key = keySelector(items[i]);
            const value = valueSelector(items[i]);

            let arr = this.storage.tryGet(key);

            if (arr) {
                arr.push(value);
            } else {
                arr = [value];
                this.storage.add(key, arr)
            }
        }
    }

    public get(key: TKey): TValue[] {
        const saved = this.storage.tryGet(key)

        if (!saved) {
            return [];
        } else {
            return saved;
        }
    }

    public entries(): Array<[TKey, TValue[]]> {
        return this.storage.entries();
    }

    public contains(key: TKey): boolean {
        return this.storage.contains(key);
    }

    public get count(): number {
        return this.storage.count;
    }
}