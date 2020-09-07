import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, MapCondition, CompareCondition, ReduceCondition, ServiceMapCondition, ReduceWithAccumulatorCondition, ZipCondition, EqualityCondition, GroupJoinCondition } from "../commands/delegates";
import { ISortingCollection } from "../interfaces/i-sorting-collection";
import _ from '../index';
import { SortSettings, Comparer, SortDirection } from "../utils/comparer";
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
import { AnyAggregator } from "../aggregators/any/any-aggregator";
import { MinAggregator } from "../aggregators/min/min-aggregator";
import { ReduceAggregator } from "../aggregators/reduce/reduce-aggregator";
import { AlgorithmSolver } from "../algorithms/solvers/algoritm-solver";
import { ZipCustomAlgorithm } from "../algorithms/zip/zip.custom/zip.algorithm.custom";
import { ZipNativeAlgorithm } from "../algorithms/zip/zip.native/zip.algorithm.native";
import { AllAggregator } from "../aggregators/all/all-aggregator";
import { ElementAtAggregator } from "../aggregators/element-at/element-at";
import { ElementAtOrDefaultAggregator } from "../aggregators/element-at-or-default/element-at-or-default-aggregator";
import { combine, of } from "../utils/operators";
import { CountWhileAggregator } from "../aggregators/count-while/count-while-aggregator";
import { SingleAggregator } from "../aggregators/single/single-aggregator";
import { SingleOrDefaultAggregator } from "../aggregators/single-or-default/single-or-defaulr-aggregator";
import { equalityCompare } from "../utils/equality-compare";
import { SSL_OP_NO_TLSv1_1 } from "constants";
import { CollectionEqualAggregator } from "../aggregators/collectionEqual/collection-equal-aggregaor";

export class Collection<T> implements ICollection<T> {
    // @ts-ignore
    protected inner: Collection<T>;
    private computed: T[] | null = null;

    public constructor(iterable: T[] | ICollection<T>) {
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

    public select<TOut>(condition: ServiceMapCondition<T, TOut>): ICollection<TOut> {                
        // @ts-ignore
        return new MappingCollection<T, TOut>(this, condition);
    }

    public selectMany<TOut>(condition: ServiceMapCondition<T, TOut[]>): ICollection<TOut> {                
        // @ts-ignore
        return new MappingManyCollection<T, TOut>(this, condition);
    }

    public skip(shouldSkip: number): ICollection<T> {
        return new SkippingCollection(this, shouldSkip);
    }

    public skipLast(shouldSkip: number): ICollection<T> {
        return new SkippingLastCollection(this, shouldSkip);
    }

    public skipWhile(condition: FilterCondition<T>): ICollection<T> {
        return new SkippingWhileCollection(this, condition);
    }

    public single(): T {
        return new SingleAggregator<T>(this).aggregate();
    }
    public singleOrDefault(): T | null;
    public singleOrDefault($default: T): T;
    public singleOrDefault($default?: T): T | null {
        return new SingleOrDefaultAggregator<T>(this, $default).aggregate();
    }

    public take(shouldTake: number): ICollection<T> {
        return new TakingCollection(this, shouldTake);
    }

    public takeLast(shouldSkip: number): ICollection<T> {
        return new TakingLastCollection(this, shouldSkip);
    }

    public takeWhile(condition: FilterCondition<T>): ICollection<T> {
        return new TakingWhileCollection(this, condition);
    }

    public collectionEqual(collection: T[] | ICollection<T>): boolean;
    public collectionEqual(collection: T[] | ICollection<T>, comparer: EqualityCondition<T>): boolean;
    public collectionEqual(collection: T[] | ICollection<T>, comparer?: EqualityCondition<T>): boolean {
        return new CollectionEqualAggregator<T>(this, new Collection(collection), comparer).aggregate();
    }

    public first(predicate?: FilterCondition<T>): T {
        if(predicate) {
            return new ElementAtAggregator(this.where(predicate), 0).aggregate();
        } else {
            return new ElementAtAggregator<T>(this, 0).aggregate();
        }
    }

    public firstOrDefault(): T | null;
    public firstOrDefault($default: T): T;
    public firstOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null {
        if(predicate) {
            // @ts-ignore
            return new ElementAtOrDefaultAggregator<T>(this.where(predicate), 0, $default).aggregate();
        } else {
            // @ts-ignore
            return new ElementAtOrDefaultAggregator<T>(this, 0, $default).aggregate();
        }
    }

    public last(predicate?: FilterCondition<T>): T {
        if(predicate) {
            const collection = this.where(predicate);
            return new ElementAtAggregator<T>(collection, collection.count() - 1).aggregate();
        } else {
            return new ElementAtAggregator<T>(this, this.count() - 1).aggregate();
        }
    }

    public lastOrDefault(): T | null
    public lastOrDefault($default: T): T
    public lastOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null {
        if(predicate) {
            const collection = this.where(predicate);
            // @ts-ignore
            return new ElementAtOrDefaultAggregator<T>(collection, collection.count() - 1, $default).aggregate();
        } else {
            // @ts-ignore
            return new ElementAtOrDefaultAggregator<T>(this, this.count() - 1, $default).aggregate();
        }
    }

    public sort(condition?: CompareCondition<T> | undefined): ICollection<T> {
        return new SortingCollection<T>(this, {
            compare: condition,
            direcion: SortDirection.Asc
        })
    }

    public sortDescending(condition?: CompareCondition<T> | undefined): ICollection<T> {
        return new SortingCollection<T>(this, {
            compare: condition,
            direcion: SortDirection.Desc
        })
    }

    public orderBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, {
            mapping: map,
            compare: condition,
            direcion: SortDirection.Asc
        })
    }

    public orderByDescending<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, {
            mapping: map,
            compare: condition,
            direcion: SortDirection.Desc
        })
    }

    public prepend(item: T): ICollection<T> {
        return new PrependCollection(this, item);
    }

    public min(predicate?: CompareCondition<T> | undefined): T {
        return new MinAggregator(this, predicate).aggregate();
    }

    public max(predicate?: CompareCondition<T> | undefined): T {
        return new MaxAggregator(this, predicate).aggregate();
    }

    public any(predicate: FilterCondition<T>): boolean {
        return new AnyAggregator(this, predicate).aggregate();
    }

    public all(predicate: FilterCondition<T>): boolean {
        return new AllAggregator(this, predicate).aggregate();
    }

    public contains(element: T, condition: EqualityCondition<T> = equalityCompare): boolean {
        return this.any(item => condition(item, element));
    }

    public sum(map?: MapCondition<T, number>): number {
        if(map) {
            return new SumAggregator(this.select(map)).aggregate();
        } else {
            // @ts-ignore
            return new SumAggregator(this).aggregate();
        }
    }

    public average(map?: MapCondition<T, number>): number {
        const sum = map ?
            new SumAggregator(this.select(map)).aggregate() :
            // @ts-ignore
            new SumAggregator(this).aggregate();

        return sum / this.count()
    }

    public reverse(): ICollection<T> {
        return new ReverseCollection(this);
    }

    public append(item: T): ICollection<T> {
        return new AppendCollection(this, item);
    }

    public defaultIfEmpty(value: T | T[] | ICollection<T>): ICollection<T> {
        return new DefaultCollection(this, value);
    }

    public distinct(): ICollection<T>;
    public distinct(comparer: EqualityCondition<T>): ICollection<T>
    public distinct(comparer?: EqualityCondition<T>): ICollection<T> {
        return new DistinctCollection(this, comparer);
    }

    public union(items: T[] | ICollection<T>): ICollection<T>;
    public union(items: T[] | ICollection<T>, comparer: EqualityCondition<T>): ICollection<T>;
    public union(items: T[] | ICollection<T>, comparer?: EqualityCondition<T>): ICollection<T> {
        return new UnionCollection(this, new Collection(items), comparer);
    }

    public intersect(items: T[] | ICollection<T>): ICollection<T>;
    public intersect(items: T[] | ICollection<T>, comparer: EqualityCondition<T>): ICollection<T>;
    public intersect(items: T[] | ICollection<T>, comparer?: EqualityCondition<T>): ICollection<T> {
        return new IntersectCollection(this, new Collection(items), comparer);
    }

    public except(items: T[] | ICollection<T>): ICollection<T>;
    public except(items: T[] | ICollection<T>, comparer: EqualityCondition<T>): ICollection<T>;
    public except(items: T[] | ICollection<T>, comparer?: EqualityCondition<T>): ICollection<T> {
        return new ExceptCollection(this, new Collection(items), comparer);
    }
    
    public groupBy<TKey>(key: MapCondition<T, TKey>): ICollection<IGroupedData<TKey, ICollection<T>>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, group: MapCondition<ICollection<T>, TValue>): ICollection<IGroupedData<TKey, TValue>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, group?: MapCondition<ICollection<T>, TValue>): ICollection<IGroupedData<TKey, TValue>> {
        return new GroupingCollection<T, TKey, TValue>(this, key, group);
    }

    public concat(items: T[] | ICollection<T>): ICollection<T> {
        return new ConcatCollection<T>(this, Array.isArray(items) ? new Collection(items) : items);
    }

    public count(predicate?: FilterCondition<T>): number {
        return new CountAggregator(this, predicate).aggregate();
    }

    public countWhile(predicate: FilterCondition<T>): number {
        return new CountWhileAggregator(this, predicate).aggregate();
    }

    public aggregate(predicate: ReduceCondition<T>, accumulator?: T): T;

    public aggregate<T2>(predicate: ReduceWithAccumulatorCondition<T, T2>, accumulator: T2): T2 {
        // @ts-ignore
        return new ReduceAggregator<T, T2>(this, predicate, accumulator).aggregate();
    }

    public zip<T2, TResult>(iterable: ICollection<T2> | T2[], zipFunc?: ZipCondition<T, T2, TResult>): ICollection<TResult>;
    public zip<T2>(iterable: ICollection<T2> | T2[]): ICollection<[T, T2]>;
    public zip<T2, TResult>(iterable: ICollection<T2> | T2[], zipFunc?: ZipCondition<T, T2, TResult>): ICollection<TResult> {
        return new ZipCollection<T, T2, TResult>(this, new Collection<T2>(iterable), zipFunc)
    }

    join<T2, TKey, TResult>(
        iterable: ICollection<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ICollection<TResult> {
            return new JoinCollection<T, T2, TKey, TResult>(this, new Collection(iterable), firstKey, secondKey, zipFunc);
        }

    groupJoin<T2, TKey, TResult>(
        iterable: ICollection<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ICollection<TResult> {
            return new GroupJoinCollection<T, T2, TKey, TResult>(this, new Collection(iterable), firstKey, secondKey, zipFunc);
        }

    public elementAt(position: number): T {
        return new ElementAtAggregator<T>(this, position).aggregate()
    }

    public elementAtOrDefault(position: number): T | null;
    public elementAtOrDefault(position: number, $default: T): T;
    public elementAtOrDefault(position: number, $default: T | null = null): T| null {
        return new ElementAtOrDefaultAggregator<T>(this, position, $default).aggregate()
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
        const result = new FilteringCollection<T>(this.inner, item => this.condition(item) && condition(item));

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

export class MappingManyCollection<T, T2> extends Collection<T> {
    public constructor(iterable: Collection<T>, private condition: ServiceMapCondition<T, T2[]>) {
        // @ts-ignore
        super(iterable);
    }

    // @ts-ignore
    public selectMany<TOut>(condition: MapCondition<T, TOut[]>): ICollection<TOut> {
        // @ts-ignore
        const result = new MappingManyCollection<T, T2>(this.inner, (item: T) => condition(this.condition(item)));

        // @ts-ignore
        return result;
    }

    // @ts-ignore
    protected materialize(): T2[] {        
        const array = this.inner.toArray();

        const algo = this.chooseAlgorithm(array);

        const partsOfResult = algo.run(array, this.condition);

        if(partsOfResult.length === 0) return [];

        const result = new Collection(partsOfResult).aggregate((a, b) => a.concat(b))

        return result;
    }

    protected chooseAlgorithm(array: T[]): IAlgorithm<T2[][]> {
        return new AlgorithmSolver().solve(new MapCustomAlgorithm<T, T2[]>(), new MapNativeAlgorithm<T, T2[]>(), array);
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

export class SkippingLastCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private shouldSkip: number) {
        super(iterable);
    }

    protected materialize(): T[] {
        const array = this.inner.toArray();

        if(array.length < this.shouldSkip) {
            throw Exception.SoManySkipping;
        }

        return array.slice(0, array.length - this.shouldSkip);
    }
}

export class SkippingWhileCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private shouldSkip: FilterCondition<T>) {
        super(iterable);
    }

    protected materialize(): T[] {
        const count = this.inner.countWhile(this.shouldSkip);

        return this.inner.toArray().slice(count);
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

export class TakingLastCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private shouldTake: number) {
        super(iterable);
    }

    protected materialize(): T[] {
        const array = this.inner.toArray()
        return array.slice(array.length - this.shouldTake);
    }
}

export class TakingWhileCollection<T> extends Collection<T> {
    public constructor(iterable: Collection<T>, private shouldTake: FilterCondition<T>) {
        super(iterable);
    }

    protected materialize(): T[] {
        const count = this.inner.countWhile(this.shouldTake);

        return this.inner.toArray().slice(0, count);
    }
}

export class SortingCollection<T, V = T> extends Collection<T> implements ISortingCollection<T> {
    private sortSettings: SortSettings<T, V>[];
    
    public constructor(iterable: Collection<T>, ...sortSettings: SortSettings<T, V>[]) {
        super(iterable);
        this.sortSettings = sortSettings;
    }

    public thenBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E>): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, ...this.sortSettings, {
            mapping: map,
            compare: condition,
            direcion: SortDirection.Asc
        })
    }

    thenByDescending<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T> {
        // @ts-ignore
        return new SortingCollection<T, E>(this, ...this.sortSettings, {
            mapping: map,
            compare: condition,
            direcion: SortDirection.Desc
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

export class DistinctCollection<T> extends Collection<T> {    
    public constructor(iterable: Collection<T>, private comparer?: EqualityCondition<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        const array = this.inner.toArray();
        
        const algo = this.chooseAlgorithm(array);

        return algo.run(array, this.comparer);
    }

    protected chooseAlgorithm(array: T[]): IAlgorithm<T[]> {
        if(!this.comparer){
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

export class ZipCollection<T1, T2, TResult = [T1, T2]> extends Collection<TResult> {    
    public constructor(iterable: Collection<T1>, private outer: Collection<T2>, 
        // @ts-ignore
        private zipCondition: ZipCondition<T1, T2, TResult> = ((a: T1, b: T2) => [a, b] as TResult)) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        const array = this.inner.toArray();
        const zipper = this.outer.toArray();

        // @ts-ignore
        const algo = this.chooseAlgorithm<T2>(array);

        return algo.run(array, zipper, this.zipCondition);
    }

    protected chooseAlgorithm(array: T1[]): IAlgorithm<TResult[]> {
        return new AlgorithmSolver().solve(new ZipCustomAlgorithm<T1, T2, TResult>(), new ZipNativeAlgorithm<T1, T2, TResult>(), array);
    }
}

export class JoinCollection<T1, T2, TKey, TResult> extends Collection<TResult> {    
    public constructor(
        iterable: Collection<T1>,
        private outer: Collection<T2>, 
        private firstKey: MapCondition<T1, TKey>,
        private secondKey: MapCondition<T2, TKey>,
        private zipFunc: ZipCondition<T1, T2, TResult>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const left = this.inner as ICollection<T1>;
        
        const right = this.outer.groupBy(this.secondKey).aggregate((map, item) => {
            map.set(item.key, item.group);
            return map;
        }, new Map<TKey, ICollection<T2>>());

        const result = left.selectMany(item => {
            const target = right.get(this.firstKey(item))

            if(target) {
                return combine(item, target);
            } else {
                return []
            }
        }).select(item => this.zipFunc(item[0], item[1])).toArray()

        return result;
    }
}

export class GroupJoinCollection<T1, T2, TKey, TResult> extends Collection<TResult> {    
    public constructor(
        iterable: Collection<T1>,
        private outer: Collection<T2>, 
        private firstKey: MapCondition<T1, TKey>,
        private secondKey: MapCondition<T2, TKey>,
        private zipFunc: GroupJoinCondition<T1, T2, TResult>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const left = this.inner as ICollection<T1>;
        
        const right = this.outer.groupBy(this.secondKey).aggregate((map, item) => {
            map.set(item.key, item.group);
            return map;
        }, new Map<TKey, ICollection<T2>>());

        const result = left.select<[T1, ICollection<T2>] | null>(item => {
            const target = right.get(this.firstKey(item))

            if(target) {
                return [item, target];
            } else {
                return null
            } 
        })
        .where(item => item !== null)
        // @ts-ignore
        .select(item => this.zipFunc(item[0], item[1])).toArray()

        return result;
    }
}

export class PrependCollection<T> extends Collection<T> {    
    public constructor(iterable: Collection<T>, private prepender: T) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const array = this.inner.toArray();
        const temp = Array.of(this.prepender);

        const result = temp.concat(array);

        return result;
    }
}

export class AppendCollection<T> extends Collection<T> {    
    public constructor(iterable: Collection<T>, private appender: T) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const array = this.inner.toArray();
        const temp = Array.of(this.appender);

        const result = array.concat(temp);

        return result;
    }
}

export class DefaultCollection<T> extends Collection<T> {    
    private reserved: ICollection<T>;

    public constructor(iterable: Collection<T>, reserved: T | T[] | ICollection<T>) {
        super(iterable);

        if(reserved instanceof Collection) {
            this.reserved = reserved;
        } else if (Array.isArray(reserved)) {
            this.reserved = new Collection(reserved);
        } else {
            // @ts-ignore
            this.reserved = of(reserved);
        }
    }

    protected materialize(): Array<T> {
        const result = this.inner.toArray();

        if (result.length > 0) {
            return result;
        } else {
            return this.reserved.toArray();
        }
    }
}

export class UnionCollection<T> extends Collection<T> {   
    public constructor(iterable: Collection<T>, private outer: ICollection<T>, private comparer?: EqualityCondition<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        // @ts-ignore
        return this.inner.concat(this.outer).distinct(this.comparer).toArray();
    }
}

export class IntersectCollection<T> extends Collection<T> {   
    public constructor(iterable: Collection<T>, private outer: ICollection<T>, private comparer?: EqualityCondition<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const first = this.inner.toArray();

        const result = [];

        for(let i = 0, len = first.length; i < len; i++) {
            // @ts-ignore
            if(this.outer.contains(first[i], this.comparer)) {
                result.push(first[i])
            }
        }

        // @ts-ignore
        return new Collection(result).distinct(equalityCompare).toArray();
    }
}

export class ExceptCollection<T> extends Collection<T> {   
    public constructor(iterable: Collection<T>, private outer: ICollection<T>, private comparer?: EqualityCondition<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const first = this.inner.toArray();

        const result = [];

        for(let i = 0, len = first.length; i < len; i++) {
            // @ts-ignore
            if(!this.outer.contains(first[i], this.comparer)) {
                result.push(first[i])
            }
        }

        // @ts-ignore
        return new Collection(result).distinct(equalityCompare).toArray();
    }
}