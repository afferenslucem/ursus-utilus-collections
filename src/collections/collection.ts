import { NativeArrayWrapper } from "./native-array-wrapper";
import { IterableCollection } from "./iterable-collection";
import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, MapCondition, SortCondition } from "../commands/delegates";
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
            this.inner = new NativeArrayWrapper<T>(iterable);
        } else {
            this.inner = iterable;
        }
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        return new FilteringCollection<T>(this, condition);
    }

    select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {                
        // @ts-ignore
        return new MappingCollection<T, TOut>(this, condition);
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

    protected deepCopy(): Collection<T> {
        const result = new Collection<T>(this);

        return result;
    }

    public toArray(): T[] {
        return this.computed;
    }

    public getIterator(): IterableIterator<T> {
        return this.computed[Symbol.iterator]();
    }

    public get computed(): T[] {
        if (this._computed == null) {
            this._computed = this.materialize();
        }
        return this._computed;
    }

    public materialize(): T[] {
        return this.inner.materialize();
    }
}

export class FilteringCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T> | T[], private condition: FilterCondition<T>) {
        super(iterable);
    }
    
    where(condition: FilterCondition<T>): ICollection<T> { 
        const result = new FilteringCollection<T>(this.inner, (item: T) => this.condition(item) && condition(item));
        
        return result;
    }

    public materialize(): T[] {
        return this.inner.materialize().filter(item => this.condition(item));
    }
}

export class MappingCollection<T, V> extends Collection<T> {
    public constructor(iterable: IterableCollection<T> | T[], private condition: MapCondition<T, V>) {
        // @ts-ignore
        super(iterable);
    }

    // @ts-ignore
    public select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {
        // @ts-ignore
        const result = new MappingCollection<T, V>(this.inner, (item: T) => condition(this.condition(item)));

        // @ts-ignore
        return result;
    }

    // @ts-ignore
    public materialize(): V[] {
        return this.inner.materialize().map(item => this.condition(item));
    }
}

class SkippingCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T>, private shouldSkip: number) {
        super(iterable);
    }

    public materialize(): T[] {
        return this.inner.materialize().slice(this.shouldSkip);
    }
}

class TakingCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T>, private shouldTake: number) {
        super(iterable);
    }

    public materialize(): T[] {
        return this.inner.materialize().slice(0, this.shouldTake);
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

    public materialize(): T[] {
        const copy = Array.from(this.inner.materialize());

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

    public materialize(): IGroupedData<K, V>[] {
        // aggregate items by key
        // @ts-ignore
        const storage:Map<K, T[]> = this.inner.materialize().reduce((acc, item: T) => {
            const key = this.key(item);
            const array = acc.get(key) || [];
            array.push(item)
            acc.set(key, array)

            return acc;
        }, new Map<K, T[]>());

        // convert storage to IGD
        const temp = Array.from(storage.keys()).map(item => {
            return {
                key: item,
                // @ts-ignore
                group: _(storage.get(item))
            }
        })

        const result = this.groupMapping ? temp.map(item => {
            // @ts-ignore
            item.group = this.groupMapping(item.group);
            return item;
        }) : temp;

        //@ts-ignore
        return result;
    }
}