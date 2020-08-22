import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, MapCondition, CompareCondition, ReduceCondition } from "../commands/delegates";
import { FirstAggregator } from "../aggregators/first/first-aggregator";
import { ISortingCollection } from "../interfaces/i-sorting-collection";
import _ from '../index';
import { SortSettings, Comparer } from "../utils/comparer";
import { IGroupedData } from "../interfaces/i-grouped-data";
import { MaxAggregator } from "../aggregators/max/max-aggregator";
import { SumAggregator } from "../aggregators/sum/sum-aggregator";
import { CountAggregator } from "../aggregators/count/count-aggregator";
import { Exception } from "../exceptions/exceptions";
import { DistinctByCustomAlgorithm } from "../algorithms/distinct/distinct-by.custom/distinct-by.algorithm.custom";
import { DistinctByNativeAlgorithm } from "../algorithms/distinct/distinct-by.native/distinct-by.algorithm.native";
import { DistinctAlgorithm } from "../algorithms/distinct/distinct/distinct.algorithm";
import { IAlgorithm } from "../algorithms/i-algorithm";
import { FilterCustomAlgorithm } from "../algorithms/filter/filter.custom/filter.algorithm.custom";
import { FilterNativeAlgorithm } from "../algorithms/filter/filter.native/filter.algorithm.native";
import { MapCustomAlgorithm } from "../algorithms/map/map.custom/map.algorithm.custom";
import { MapNativeAlgorithm } from "../algorithms/map/map.native/map.algorithm.native";
import { ExistsAggregator } from "../aggregators/exists/exists-aggregator";
import { FirstOrDefaultAggregator } from "../aggregators/first-or-default/first-or-default-aggregator";
import { LastAggregator } from "../aggregators/last/last-aggregator";
import { LastOrDefaultAggregator } from "../aggregators/last-or-default/last-or-default-aggregator";
import { MinAggregator } from "../aggregators/min/min-aggregator";
import { ReduceAggregator } from "../aggregators/reduce/reduce-aggregator";
import { AlgorithmSolver } from "../algorithms/solvers/algoritm-solver";
import { SumByAggregator } from "../aggregators/sum-by-aggregator";

export class Collection<T> implements ICollection<T> {
    // @ts-ignore
    protected inner: Collection<T>;
    private computed: T[] | null = null;

    public constructor(iterable: T[] | Collection<T>) {
        if (iterable instanceof Collection) {
            this.inner = iterable;
        } else if (Array.isArray(iterable)) {
            this.computed = iterable;
        } else {
            throw Exception.WrongCollectionException
        }
    }

    public where(condition: FilterCondition<T>): ICollection<T> {
        return new FilteringCollection<T>(this, condition);
    }

    public select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {                
        // @ts-ignore
        return new MappingCollection<T, TOut>(this, condition);
    }

    public skip(shouldSkip: number): ICollection<T> {
        return new SkippingCollection(this, shouldSkip);
    }

    public take(shouldTake: number): ICollection<T> {
        return new TakingCollection(this, shouldTake);
    }

    public first(predicate?: FilterCondition<T> | undefined): T {
        return new FirstAggregator(this, predicate).aggregate();
    }

    public firstOrDefault($default?: T | null, predicate?: FilterCondition<T> | undefined): T | null {
        return new FirstOrDefaultAggregator(this, predicate, $default).aggregate();
    }

    public last(predicate?: FilterCondition<T> | undefined): T {
        return new LastAggregator(this, predicate).aggregate();
    }

    public lastOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null {
        return new LastOrDefaultAggregator(this, predicate, $default).aggregate();
    }

    public sort(condition?: CompareCondition<T> | undefined): ICollection<T> {
        return new SortingCollection<T>(this, {
            compare: condition
        })
    }

    public sortBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, {
            mapping: map,
            compare: condition
        })
    }
    
    public groupBy<K, V>(key: MapCondition<T, K>, group?: MapCondition<ICollection<T>, V> | undefined): ICollection<IGroupedData<K, V>> {
        return new GroupingCollection<T, K, V>(this, key, group);
    }

    public min(predicate?: CompareCondition<T> | undefined): T {
        return new MinAggregator(this, predicate).aggregate();
    }

    public max(predicate?: CompareCondition<T> | undefined): T {
        return new MaxAggregator(this, predicate).aggregate();
    }

    public exists(predicate: FilterCondition<T>): boolean {
        return new ExistsAggregator(this, predicate).aggregate();
    }

    public sum<V>(predicate?: ReduceCondition<T, V>): V {
        if(predicate) {
            return new SumByAggregator(this, predicate).aggregate();
        } else {
            // @ts-ignore
            return new SumAggregator(this).aggregate();
        }
    }

    public reverse(): ICollection<T> {
        return new ReverseCollection(this);
    }

    public distinct<K>(mapping?: MapCondition<T, K>): ICollection<T> {
        return new DistinctCollection(this, mapping);
    }

    public concat(items: T[] | ICollection<T>): ICollection<T> {
        return new ConcatCollection<T>(this, Array.isArray(items) ? new Collection(items) : items);
    }

    public count(predicate?: FilterCondition<T>): number {
        return new CountAggregator(this, predicate).aggregate();
    }

    public aggregate<V>(predicate: ReduceCondition<T, V>, accumulator?: V): V {
        // @ts-ignore
        return new ReduceAggregator<T, V>(this, predicate, accumulator).aggregate();
    }

    public toArray(): T[] {
        if (this.computed == null) {
            this.computed = this.materialize();
        }
        return this.computed
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.getIterator();
    }

    public getIterator(): IterableIterator<T> {
        return this.toArray()[Symbol.iterator]();
    }

    public get materialized(): boolean {
        return !!this.computed;
    }

    protected materialize(): T[] {
        return this.inner.toArray();
    }
}

export class FilteringCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private condition: FilterCondition<T>) {
        super(iterable);
    }
    
    public where(condition: FilterCondition<T>): ICollection<T> { 
        const result = new FilteringCollection<T>(this.inner, item => condition(item) && this.condition(item));

        return result;
    }

    protected materialize(): T[] {        
        const array = this.inner.toArray();

        const algo = this.chooseAlgorithm(array);

        return algo.run(array, this.condition)
    }

    protected chooseAlgorithm(array: T[]): IAlgorithm<T[]> {
        return new AlgorithmSolver().solve(new FilterCustomAlgorithm<T>(), new FilterNativeAlgorithm<T>(), array);
    }
}

export class MappingCollection<T, V> extends Collection<T> {
    public constructor(iterable: Collection<T>, private condition: MapCondition<T, V>) {
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
    protected materialize(): V[] {        
        const array = this.inner.toArray();

        const algo = this.chooseAlgorithm<V>(array);

        return algo.run(array, this.condition);
    }

    protected chooseAlgorithm<V>(array: T[]): IAlgorithm<V[]> {
        return new AlgorithmSolver().solve(new MapCustomAlgorithm<T, V>(), new MapNativeAlgorithm<T, V>(), array);
    }
}

export class SkippingCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private shouldSkip: number) {
        super(iterable);
    }

    protected materialize(): T[] {
        const array = this.inner.toArray();

        if(array.length < this.shouldSkip) {
            throw Exception.SoManySkipping;
        }

        return this.inner.toArray().slice(this.shouldSkip);
    }
}

export class TakingCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private shouldTake: number) {
        super(iterable);
    }

    protected materialize(): T[] {
        return this.inner.toArray().slice(0, this.shouldTake);
    }
}

export class SortingCollection<T, V = T> extends Collection<T> implements ISortingCollection<T> {
    private sortSettings: SortSettings<T, V>[];
    
    public constructor(iterable: Collection<T>, ...sortSettings: SortSettings<T, V>[]) {
        super(iterable);
        this.sortSettings = _(sortSettings)
        .where(item => !!item.compare || !!item.mapping)
        .toArray();
    }

    public thenBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E>): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, ...this.sortSettings, {
            mapping: map,
            compare: condition
        })
    }

    protected materialize(): T[] {
        const comparer = new Comparer(this.sortSettings, this.defaultCompare);

        return Array.from(this.inner.toArray()).sort(this.sortSettings.length ? (first, second) => comparer.compare(first, second) : undefined);
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
    public constructor(iterable: Collection<T>, private key: MapCondition<T, K>, private groupMapping?: MapCondition<ICollection<T>, V>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): IGroupedData<K, V>[] {
        // aggregate items by key
        // @ts-ignore
        const storage:Map<K, T[]> = this.inner.toArray().reduce((acc, item: T) => {
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

export class ReverseCollection<T> extends Collection<T> {    
    public constructor(iterable: Collection<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        return Array.from(this.inner.toArray()).reverse();
    }
}

export class DistinctCollection<T, K = T> extends Collection<T> {    
    public constructor(iterable: Collection<T>, private map?: MapCondition<T, K>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        const array = this.inner.toArray();
        
        const algo = this.chooseAlgorithm(array);

        return algo.run(array, this.map);
    }

    protected chooseAlgorithm(array: T[]): IAlgorithm<T[]> {
        if(!this.map){
            return new DistinctAlgorithm<T>();
        } else {
            return new AlgorithmSolver().solve(new DistinctByCustomAlgorithm<T>(), new DistinctByNativeAlgorithm<T>(), array);
        }
    }
}

export class ConcatCollection<T> extends Collection<T> {    
    public constructor(iterable: Collection<T>, private additional: ICollection<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        return this.inner.toArray().concat(this.additional.toArray());
    }
}