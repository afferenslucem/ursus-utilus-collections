import { NativeArrayWrapper } from "./native-array-wrapper";
import { IterableCollection } from "./iterable-collection";
import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, MapCondition, SortCondition } from "../commands/delegates";
import { IIterator } from "../interfaces/i-iterator";
import { FilteringIterator } from "../iterators/filtering-iterator";
import { MappingIterator } from "../iterators/mapping-iterator";
import { SkippingIterator } from "../iterators/skipping-iterator";
import { TakingIterator } from "../iterators/taking-iterator";
import { NativeArrayIterator } from "../iterators/native-array-iterator";
import { FirstAggregator } from "../aggregators/first-aggregator";
import { FirstOrDefaultAggregator } from "../aggregators/first-or-default-aggregator";
import { LastAggregator } from "../aggregators/last-aggregtor";
import { LastOrDefaultAggregator } from "../aggregators/last-or-default-aggregtor";
import { ISortingCollection } from "../interfaces/i-sorting-collection";
import _ from '../index';
import { SortSettings, Comparer } from "../utils/comparer";
import { IGroupedData } from "../interfaces/i-grouped-data";

export class Collection<T> extends IterableCollection<T> implements ICollection<T> {
    protected inner: IterableCollection<T>;
    private _computed: T[] | null = null;

    public constructor(iterable: T[] | IterableCollection<T>) {
        super();

        if(Array.isArray(iterable)) {
            const copy = Array.from(iterable);
            this.inner = new NativeArrayWrapper<T>(copy);
        } else {
            this.inner = iterable;
        }
    }

    public [Symbol.iterator](): IIterator<T> {
        return new NativeArrayIterator(this.computed);
    }

    protected deepCopy(): Collection<T> {
        const result = new Collection<T>(this);

        return result;
    }

    public toArray(): T[] {
        return this.computed;
    }

    public getIterator(): IIterator<T> {
        return this.inner.getIterator();
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        return new FilteringCollection<T>(this, [condition]);
    }

    select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {                
        // @ts-ignore
        return new MappingCollection<T, TOut>(this, [condition]);
    }

    skip(shouldSkip: number): ICollection<T> {
        return new SkippingCollection(this, shouldSkip);
    }

    take(shouldTake: number): ICollection<T> {
        return new TakingCollection(this, shouldTake);
    }

    first(predicate?: FilterCondition<T> | undefined): T {
        return new FirstAggregator(this, predicate).aggregate();
    }

    firstOrDefault(predicate?: FilterCondition<T> | undefined, $default?: T | null | undefined): T | null {
        return new FirstOrDefaultAggregator(this, predicate, $default).aggregate();
    }

    last(predicate?: FilterCondition<T> | undefined): T {
        return new LastAggregator(this, predicate).aggregate();
    }

    lastOrDefault(predicate?: FilterCondition<T> | undefined, $default?: T | null | undefined): T | null {
        return new LastOrDefaultAggregator(this, predicate, $default).aggregate();
    }

    sort(condition?: SortCondition<T> | undefined): ICollection<T> {
        return new SortingCollection<T>(this, {
            compare: condition
        })
    }

    sortBy<E>(map: MapCondition<T, E>, condition?: SortCondition<E> | undefined): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, {
            mapping: map,
            compare: condition
        })
    }
    
    groupBy<K, V>(key: MapCondition<T, K>, group?: MapCondition<ICollection<T>, V> | undefined): ICollection<IGroupedData<K, V>> {
        return new GroupingCollection<T, K, V>(this, key, group);
    }

    public get computed(): T[] {
        if (this._computed == null) {
            this._computed = this.materialize();
        }
        return this._computed;
    }

    protected materialize(): T[] {
        const result = Array.from({
            [Symbol.iterator]: () => this.getIterator()
        });

        Object.freeze(result);

        // @ts-ignore
        return result;
    }
}

export class FilteringCollection<T> extends Collection<T> {
    private conditions: FilterCondition<T>[];

    public constructor(iterable: IterableCollection<T> | T[], conditions: FilterCondition<T>[]) {
        super(iterable);
        this.conditions = conditions;
    }
    
    public getIterator(): IIterator<T> {
        const iterator = super.getIterator();

        return new FilteringIterator(iterator, this.conditions);
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        const copy = this.deepCopy();
        
        copy.appendCondition(condition);

        return copy;
    }

    public appendCondition(condition: FilterCondition<T>) {
        this.conditions.push(condition);
    }

    protected deepCopy(): FilteringCollection<T> {
        const result = new FilteringCollection<T>(this.inner, this.conditions);

        return result;
    }
}

export class MappingCollection<T, E> extends Collection<E> {
    private conditions: MapCondition<T, E>[];

    public constructor(iterable: IterableCollection<T> | T[], conditions: MapCondition<T, E>[]) {
        // @ts-ignore
        super(iterable);
        this.conditions = conditions;
    }
    
    public getIterator(): IIterator<E> {
        const iterator = super.getIterator();

        return new MappingIterator<T, E>(iterator, this.conditions);
    }

    public appendCondition<TOut>(condition: MapCondition<T, TOut>) {
        // @ts-ignore
        this.conditions.push(condition);
    }

    // @ts-ignore
    public select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {
        const copy = this.deepCopy();
        
        copy.appendCondition(condition);

        // @ts-ignore
        return copy;
    }

    // @ts-ignore
    protected deepCopy(): MappingCollection<T, E> {
        // @ts-ignore
        const result = new MappingCollection<T, E>(this.inner, this.conditions);

        return result;
    }
}

class SkippingCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T>, private shouldSkip: number) {
        super(iterable);
    }

    public getIterator(): IIterator<T> {
        const iterator = super.getIterator();

        return new SkippingIterator(iterator, this.shouldSkip);
    }
}

class TakingCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T>, private shouldTake: number) {
        super(iterable);
    }

    public getIterator(): IIterator<T> {
        const iterator = super.getIterator();

        return new TakingIterator(iterator, this.shouldTake);
    }
}

export class SortingCollection<T, V = T> extends Collection<T> implements ISortingCollection<T> {
    private sortSettings: SortSettings<T, V>[];
    
    public constructor(iterable: T[] | IterableCollection<T>, ...sortSettings: SortSettings<T, V>[]) {
        super(iterable);
        this.sortSettings = _(sortSettings)
        .where(item => !!item.compare || !!item.mapping)
        .toArray();
    }

    thenBy<E>(map: MapCondition<T, E>, condition?: SortCondition<E>): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, ...this.sortSettings, {
            mapping: map,
            compare: condition
        })
    }

    protected materialize(): T[] {
        const temp = super.materialize();

        const copy = Array.from(temp);

        const comparer = new Comparer(this.sortSettings, this.defaultCompare);

        const result = copy.sort(this.sortSettings.length ? (first, second) => comparer.compare(first, second) : undefined);

        Object.freeze(result);

        return result;
    }

    private defaultCompare(first: V, second: V): number {
        if(first < second) {
            return -1
        } else if (second < first) {
            return 1
        } else {
            return 0;
        }
    }
}

export class GroupingCollection<T, K, V = ICollection<T>> extends Collection<IGroupedData<K, V>> {    
    public constructor(iterable: T[] | IterableCollection<T>, private key: MapCondition<T, K>, private groupMapping?: MapCondition<ICollection<T>, V>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): IGroupedData<K, V>[] {
        // @ts-ignore
        const temp: T[] = super.materialize();

        const storage = this.groupNativeItems(temp);

        const result = this.mapGroups(storage);

        Object.freeze(result);

        return result;
    }

    private groupNativeItems(items: T[]): Map<K, T[]> {
        const storage = new Map<K, T[]>();

        items.forEach(item => {
            const key = this.key(item);

            if (!storage.has(key)) {
                storage.set(key, [item]);
            } else {
                const list = storage.get(key);
                // @ts-ignore
                list.push(item)
            }
        });

        return storage;
    }

    private mapGroups(storage: Map<K, T[]>): IGroupedData<K, V>[] {
        const result: IGroupedData<K, V>[] = [];

        const keys = Array.from(storage.keys());

        keys.forEach(item => {
            const group = storage.get(item);
            result.push({
                key: item,

                // @ts-ignore
                group: _(group)
            });
        })

        return this.groupMapping ? 
        result.map(item => {
            // @ts-ignore
            item.group = this.groupMapping(item.group);
            return item;
        }) : 
        result;
    }
}