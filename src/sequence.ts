import { Exception } from "./exceptions/exceptions";
import { ReduceCondition, ReduceWithAccumulatorCondition, FilterCondition, MapCondition, CompareCondition, ServiceMapCondition, GroupJoinCondition, ZipCondition } from "./delegates";
import { IGroupedData } from "./interfaces/i-grouped-data";
import { ISortingCollection } from "./interfaces/i-sorting-collection";
import { SortDirection, SortSettings, Comparer } from "./utils/comparer";
import { combine, of } from "./utils/operators";
import { compare } from "./utils/compare";
import { ISequence } from "./interfaces/i-sequence";
import { Dictionary } from "./collections/distionary";
import { IEqualityComparer } from "./interfaces/i-equality-comparer";
import { HashSet } from "./collections/hash-set";
import { ILookup } from "./interfaces/i-lookup";
import { Lookup } from "./collections/lookup";
import { DefaultEqualityComparer } from "./utils/abstract-equlity-comparer";
import {IPromiseMaterializeSequence} from "./interfaces/i-promisify-materialize-sequence";

export class Sequence<T> implements ISequence<T> {
    // @ts-ignore
    protected inner: Sequence<T>;
    private computed: T[] | null = null;

    public constructor(iterable: T[] | ISequence<T>) {
        if (iterable instanceof Sequence) {
            this.inner = iterable;
        } else if (Array.isArray(iterable)) {
            this.computed = iterable;
        } else {
            throw Exception.WrongCollectionException
        }
    }

    // Aggregating

    public aggregate(predicate: ReduceCondition<T>, accumulator?: T): T;
    public aggregate<T2>(predicate: ReduceWithAccumulatorCondition<T, T2>, accumulator: T2): T2;
    public aggregate<T2>(predicate: ReduceWithAccumulatorCondition<T, T2>, accumulator: T2): T2 | T {
        const array = this.toArray();
        
        if (accumulator !== undefined) {
            return array.reduce(predicate, accumulator)
        } else {
            // @ts-ignore
            return array.reduce(predicate)
        }
    }

    public all(filter: FilterCondition<T>): boolean {
        return this.toArray().every(filter);
    }

    public any(filter: FilterCondition<T>): boolean {
        return this.toArray().some(filter);
    }

    public average(map?: MapCondition<T, number>): number {
        return this.sum(map) / this.count()
    }

    public contains(element: T, comparer: IEqualityComparer<T> = new DefaultEqualityComparer<T>()): boolean {
        return this.toArray().some(item => comparer.equal(item, element));
    }

    public count(filter?: FilterCondition<T>): number {
        return (filter ? 
            this.where(filter) : 
            this).toArray().length;
    }

    public countWhile(filter: FilterCondition<T>): number {
        const array = this.toArray();

        let count = 0;

        while(filter(array[count])){
            count++;
        }

        return count;
    }
    
    public elementAt(position: number): T {
        const result = this.toArray();

        if (result.length > position && result.length !== 0) {
            return result[position];
        } else {
            throw Exception.NoMatches;
        }
    }

    public elementAtOrDefault(position: number): T | null;
    public elementAtOrDefault(position: number, $default: T): T;
    public elementAtOrDefault(position: number, $default: T | null = null): T| null {
        try {
            return this.elementAt(position);
        }
        catch(e) {
            if (e == Exception.NoMatches) {
                return $default !== undefined ? $default : null;
            } else {
                throw e;
            }            
        }
    }

    public first(predicate?: FilterCondition<T>): T {
        if(predicate) {
            return this.where(predicate).elementAt(0);
        } else {
            return this.elementAt(0);
        }
    }

    public firstOrDefault(): T | null;
    public firstOrDefault($default: T): T;
    public firstOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null {
        if(predicate) {
            // @ts-ignore
            return this.where(predicate).elementAtOrDefault(0, $default)
        } else {
            // @ts-ignore
            return this.elementAtOrDefault(0, $default)
        }
    }

    public last(predicate?: FilterCondition<T>): T {
        if(predicate) {
            const collection = this.where(predicate);
            return collection.elementAt(collection.count() - 1);
        } else {
            return this.elementAt(this.count() - 1);
        }
    }

    public lastOrDefault(): T | null
    public lastOrDefault($default: T): T
    public lastOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null {
        if(predicate) {
            const collection = this.where(predicate);
            // @ts-ignore
            return collection.elementAtOrDefault(collection.count() - 1, $default);
        } else {
            // @ts-ignore
            return this.elementAtOrDefault(this.count() - 1, $default);
        }
    }

    public max(predicate: CompareCondition<T> = compare): T {
        return this.toArray().reduce((a, b) => predicate(a, b) > 0 ? a : b)
    }

    public min(predicate: CompareCondition<T> = (a, b) => a > b ? 1 : -1): T {
        return this.toArray().reduce((a, b) => predicate(a, b) < 0 ? a : b)
    }

    public sequenceEqual(collection: T[] | ISequence<T>): boolean;
    public sequenceEqual(collection: T[] | ISequence<T>, comparer: IEqualityComparer<T>): boolean;
    public sequenceEqual(collection: T[] | ISequence<T>, comparer: IEqualityComparer<T> = new DefaultEqualityComparer<T>()): boolean {
        const arr1 = this.toArray();
        const arr2 = Array.isArray(collection) ? collection : collection.toArray();

        const len1 = arr1.length;
        const len2 = arr2.length;

        if (len1 !== len2) return false;

        return arr1.every((item, index) => comparer.equal(item, arr2[index]));
    }

    public single(): T {
        const array = this.toArray();

        if(array.length > 1) {
            throw Exception.SoManyElements;
        } else if(array.length === 0) {
            throw Exception.NoMatches;
        } else {
            return array[0];
        }
    }

    public singleOrDefault(): T | null;
    public singleOrDefault($default: T): T;
    public singleOrDefault($default?: T): T | null {
        try {
            return this.single();
        } catch (e) {
            if (e == Exception.NoMatches) {
                return $default !== undefined ? $default : null;
            } else {
                throw e;
            }
        }
    }

    public sum(map?: MapCondition<T, number>): number {
        // @ts-ignore
        const array: number[] = map ? this.toArray().map(map) : this.toArray();

        return array.reduce((a, b) => a + b);
    }

    // Querring

    public append(item: T): ISequence<T> {
        return new AppendCollection(this, item);
    }

    public defaultIfEmpty(value: T | T[] | ISequence<T>): ISequence<T> {
        return new DefaultCollection(this, value);
    }

    public distinct(): ISequence<T>;
    public distinct(comparer: IEqualityComparer<T>): ISequence<T>
    public distinct(comparer?: IEqualityComparer<T>): ISequence<T> {
        return new DistinctCollection(this, comparer);
    }
    
    public groupBy<TKey>(key: MapCondition<T, TKey>): ISequence<IGroupedData<TKey, ISequence<T>>>;
    public groupBy<TKey>(key: MapCondition<T, TKey>, comparer: IEqualityComparer<TKey>): ISequence<IGroupedData<TKey, ISequence<T>>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, group: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, comparer: IEqualityComparer<TKey>, group: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, comparer?: MapCondition<ISequence<T>, TValue> | IEqualityComparer<TKey>, group?: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>> {
        if (typeof comparer === "function") {
            return new GroupingCollection<T, TKey, TValue>(this, key, undefined, comparer);
        } else if (typeof comparer === "object") {
            return new GroupingCollection<T, TKey, TValue>(this, key, comparer, group);
        } else {
            return new GroupingCollection<T, TKey, TValue>(this, key, undefined, group);
        }
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

    public prepend(item: T): ISequence<T> {
        return new PrependCollection(this, item);
    }

    public reverse(): ISequence<T> {
        return new ReverseCollection(this);
    }

    public select<TOut>(condition: ServiceMapCondition<T, TOut>): ISequence<TOut> {
        // @ts-ignore
        return new MappingCollection<T, TOut>(this, condition);
    }

    public selectMany<TOut>(condition: ServiceMapCondition<T, TOut[]>): ISequence<TOut> {                
        // @ts-ignore
        return new MappingManyCollection<T, TOut>(this, condition);
    }

    public skip(shouldSkip: number): ISequence<T> {
        return new SkippingCollection(this, shouldSkip);
    }

    public skipLast(shouldSkip: number): ISequence<T> {
        return new SkippingLastCollection(this, shouldSkip);
    }

    public skipWhile(condition: FilterCondition<T>): ISequence<T> {
        return new SkippingWhileCollection(this, condition);
    }

    public sort(condition?: CompareCondition<T> | undefined): ISequence<T> {
        return new SortingCollection<T>(this, {
            compare: condition,
            direcion: SortDirection.Asc
        })
    }

    public sortDescending(condition?: CompareCondition<T> | undefined): ISequence<T> {
        return new SortingCollection<T>(this, {
            compare: condition,
            direcion: SortDirection.Desc
        })
    }

    public take(shouldTake: number): ISequence<T> {
        return new TakingCollection(this, shouldTake);
    }

    public takeLast(shouldSkip: number): ISequence<T> {
        return new TakingLastCollection(this, shouldSkip);
    }

    public takeWhile(condition: FilterCondition<T>): ISequence<T> {
        return new TakingWhileCollection(this, condition);
    }

    public where(condition: FilterCondition<T>): ISequence<T> {
        return new FilteringCollection<T>(this, condition);
    }

    // Joining

    public concat(items: T[] | ISequence<T>): ISequence<T> {
        return new ConcatCollection<T>(this, Array.isArray(items) ? new Sequence(items) : items);
    }

    public except(items: T[] | ISequence<T>): ISequence<T>;
    public except(items: T[] | ISequence<T>, comparer: IEqualityComparer<T>): ISequence<T>;
    public except(items: T[] | ISequence<T>, comparer?: IEqualityComparer<T>): ISequence<T> {
        return new ExceptCollection<T>(this, new Sequence(items), comparer);
    }

    public intersect(items: T[] | ISequence<T>): ISequence<T>;
    public intersect(items: T[] | ISequence<T>, comparer: IEqualityComparer<T>): ISequence<T>;
    public intersect(items: T[] | ISequence<T>, comparer?: IEqualityComparer<T>): ISequence<T> {
        return new IntersectCollection<T>(this, new Sequence(items), comparer);
    }

    public groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ISequence<TResult>;
    public groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        eqalityComparer: IEqualityComparer<TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ISequence<TResult>;
    public groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        eqalityComparer: IEqualityComparer<TKey> | GroupJoinCondition<T, T2, TResult>,
        zipFunc?: GroupJoinCondition<T, T2, TResult>): ISequence<TResult> {
        if(typeof eqalityComparer === "object") {
            // @ts-ignore
            return new GroupJoinCollection<T, T2, TKey, TResult>(this, new Sequence(iterable), firstKey, secondKey, eqalityComparer, zipFunc);
        } else {
            return new GroupJoinCollection<T, T2, TKey, TResult>(this, new Sequence(iterable), firstKey, secondKey, undefined, eqalityComparer);
        }
    }

    public join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        eqalityComparer: IEqualityComparer<TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult>;
    public join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult>;

    public join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        eqalityComparer: IEqualityComparer<TKey> |  ZipCondition<T, T2, TResult>,
        zipFunc?: ZipCondition<T, T2, TResult>): ISequence<TResult> {
        if(typeof eqalityComparer === "object") {
            // @ts-ignore
            return new JoinCollection<T, T2, TKey, TResult>(this, new Sequence(iterable), firstKey, secondKey, eqalityComparer, zipFunc);
        } else {
            return new JoinCollection<T, T2, TKey, TResult>(this, new Sequence(iterable), firstKey, secondKey, undefined, eqalityComparer);
        }
    }

    public union(items: T[] | ISequence<T>): ISequence<T>;
    public union(items: T[] | ISequence<T>, comparer: IEqualityComparer<T>): ISequence<T>;
    public union(items: T[] | ISequence<T>, comparer?: IEqualityComparer<T>): ISequence<T> {
        return new UnionCollection<T>(this, new Sequence(items), comparer);
    }

    public zip<T2, TResult>(iterable: ISequence<T2> | T2[], zipFunc?: ZipCondition<T, T2, TResult>): ISequence<TResult>;
    public zip<T2>(iterable: ISequence<T2> | T2[]): ISequence<[T, T2]>;
    public zip<T2, TResult>(iterable: ISequence<T2> | T2[], zipFunc?: ZipCondition<T, T2, TResult>): ISequence<TResult> {
        return new ZipCollection<T, T2, TResult>(this, new Sequence<T2>(iterable), zipFunc)
    }

    // Materializing

    public toArray(): T[] {
        if (this.computed == null) {
            this.computed = this.materialize();
        }
        return this.computed
    }

    public toHashSet(): HashSet<T>;
    public toHashSet(eqalityComparer: IEqualityComparer<T>): HashSet<T>
    public toHashSet(eqalityComparer?: IEqualityComparer<T>): HashSet<T> {
        const result = new HashSet(eqalityComparer);

        const array = this.toArray();

        for(let i = 0, len = array.length; i < len; i++) {
            result.add(array[i]);
        }

        return result;
    }

    public toLookup<TKey>(key: MapCondition<T, TKey>): ILookup<TKey, T>;
    public toLookup<TKey>(key: MapCondition<T, TKey>, comparer: IEqualityComparer<TKey>): ILookup<TKey, T>;
    public toLookup<TKey, TValue>(key: MapCondition<T, TKey>, comparer: IEqualityComparer<TKey>, value: MapCondition<T, TValue>): ILookup<TKey, TValue>;
    public toLookup<TKey, TValue>(key: MapCondition<T, TKey>, value: MapCondition<T, TValue>): ILookup<TKey, TValue>;
    public toLookup<TKey, TValue = T>(key: MapCondition<T, TKey>, comparer?: IEqualityComparer<TKey> | MapCondition<T, TValue>, value?: MapCondition<T, TValue>): ILookup<TKey, TValue> {
        if(typeof comparer === "function") {
            return new Lookup<T, TKey, TValue>(this.toArray(), key, comparer)
        } else {
            return new Lookup<T, TKey, TValue>(this.toArray(), key, value, comparer)
        }
    }

    public toDictionary<TKey>(key: MapCondition<T, TKey>): Dictionary<TKey, T>;
    public toDictionary<TKey>(key: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): Dictionary<TKey, T>;
    public toDictionary<TKey, TValue>(key: MapCondition<T, TKey>, value: MapCondition<T, TValue>): Dictionary<TKey, TValue>;
    public toDictionary<TKey, TValue>(key: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, value: MapCondition<T, TValue>): Dictionary<TKey, TValue>;
    public toDictionary<TKey, TValue = T>(key: MapCondition<T, TKey>, eqalityComparer?: IEqualityComparer<TKey> | MapCondition<T, TValue>, value?: MapCondition<T, TValue>): Dictionary<TKey, TValue> {        
        const materialized = this.toArray();

        const result = typeof eqalityComparer === "object" ? new Dictionary<TKey, TValue | T>(eqalityComparer) :  new Dictionary<TKey, TValue | T>();

        if(typeof eqalityComparer === "function")  {
            value = eqalityComparer;
        }

        if(value) {
            for(let i = 0, len = materialized.length; i < len; i++) {
                const keyItem = key(materialized[i]);
                const valueItem = value(materialized[i]);
    
                result.addIfNotExists(keyItem, valueItem)
            }
        } else {
            for(let i = 0, len = materialized.length; i < len; i++) {
                const keyItem = key(materialized[i]);
                result.addIfNotExists(keyItem, materialized[i])
            }
        }


        // @ts-ignore
        return result;
    }

    public promisify(): PromisifyCollection<T> {
        return new PromisifyCollection<T>(this);
    }

    ///////////////////////////

    public [Symbol.iterator](): IterableIterator<T> {
        return this.getIterator();
    }

    public getIterator(): IterableIterator<T> {
        return this.toArray()[Symbol.iterator]();
    }

    public get materialized(): boolean {
        return !!this.computed;
    }

    protected materialize(): any[] {
        return this.inner.toArray();
    }
}

export class FilteringCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private condition: FilterCondition<T>) {
        super(iterable);
    }
    
    public where(condition: FilterCondition<T>): ISequence<T> { 
        const result = new FilteringCollection<T>(this.inner, item => this.condition(item) && condition(item));

        return result;
    }

    protected materialize(): T[] {        
        const array = this.inner.toArray();

        return array.filter(this.condition);
    }
}

export class MappingCollection<T, V> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private condition: MapCondition<T, V>) {
        // @ts-ignore
        super(iterable);
    }

    public select<TOut>(condition: MapCondition<T, TOut>): ISequence<TOut> {
        // @ts-ignore
        const result = new MappingCollection<T, V>(this.inner, (item: T) => condition(this.condition(item)));

        // @ts-ignore
        return result;
    }

    protected materialize(): V[] {        
        const array = this.inner.toArray();

        return array.map(this.condition);
    }
}

export class MappingManyCollection<T, T2> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private condition: ServiceMapCondition<T, T2[]>) {
        // @ts-ignore
        super(iterable);
    }

    public selectMany<TOut>(condition: MapCondition<T, TOut[]>): ISequence<TOut> {
        // @ts-ignore
        const result = new MappingManyCollection<T, T2>(this.inner, (item: T) => condition(this.condition(item)));

        // @ts-ignore
        return result;
    }

    protected materialize(): T2[] {        
        const array = this.inner.toArray();

        const partsOfResult = array.map(this.condition);

        if(partsOfResult.length === 0) return [];

        return partsOfResult.reduce((a, b) => a.concat(b))
    }
}

export class SkippingCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private shouldSkip: number) {
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

export class SkippingLastCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private shouldSkip: number) {
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

export class SkippingWhileCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private shouldSkip: FilterCondition<T>) {
        super(iterable);
    }

    protected materialize(): T[] {
        const count = this.inner.countWhile(this.shouldSkip);

        return this.inner.toArray().slice(count);
    }
}

export class TakingCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private shouldTake: number) {
        super(iterable);
    }

    protected materialize(): T[] {
        return this.inner.toArray().slice(0, this.shouldTake);
    }
}

export class TakingLastCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private shouldTake: number) {
        super(iterable);
    }

    protected materialize(): T[] {
        const array = this.inner.toArray()
        return array.slice(array.length - this.shouldTake);
    }
}

export class TakingWhileCollection<T> extends Sequence<T> {
    public constructor(iterable: Sequence<T>, private shouldTake: FilterCondition<T>) {
        super(iterable);
    }

    protected materialize(): T[] {
        const count = this.inner.countWhile(this.shouldTake);

        return this.inner.toArray().slice(0, count);
    }
}

export class SortingCollection<T, V = T> extends Sequence<T> implements ISortingCollection<T> {
    private sortSettings: SortSettings<T, V>[];
    
    public constructor(iterable: Sequence<T>, ...sortSettings: SortSettings<T, V>[]) {
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

export class GroupingCollection<T, TKey, TValue = ISequence<T>> extends Sequence<IGroupedData<TKey, TValue>> {    
    public constructor(iterable: Sequence<T>, private key: MapCondition<T, TKey>, private comparer?: IEqualityComparer<TKey>, private groupMapping?: MapCondition<ISequence<T>, TValue>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): IGroupedData<TKey, TValue>[] {
        // @ts-ignore
        const lookup = this.inner.toLookup(this.key, this.comparer) as ILookup<TKey, TValue>;

        if(this.groupMapping !== undefined) {
            return lookup.entries().map<IGroupedData<TKey, TValue>>(item => ({
                key: item[0],
                // @ts-ignore
                group: this.groupMapping(new Sequence(item[1]))
            }))
        } else {
            // @ts-ignore
            return lookup.entries().map<IGroupedData<TKey, ISequence<TValue>>>(item => ({
                key: item[0],
                group: new Sequence(item[1])
            }))
        }
    }
}

export class ReverseCollection<T> extends Sequence<T> {    
    public constructor(iterable: Sequence<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        return Array.from(this.inner.toArray()).reverse();
    }
}

export class DistinctCollection<T> extends Sequence<T> {    
    public constructor(iterable: Sequence<T>, private comparer?: IEqualityComparer<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        if(this.comparer) {
            const result: HashSet<T> = new HashSet<T>(this.comparer);
    
            const array = this.inner.toArray();
    
            for(let i = 0, len = array.length; i < len; i++) {
                // @ts-ignore
                result.add(array[i])
            }
    
            return result.entries();
        } else {
            return Array.from(new Set(this.inner.toArray()));
        }
    }
}

export class ConcatCollection<T> extends Sequence<T> {    
    public constructor(iterable: Sequence<T>, private additional: ISequence<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        return this.inner.toArray().concat(this.additional.toArray());
    }
}

export class ZipCollection<T1, T2, TResult = [T1, T2]> extends Sequence<TResult> {    
    public constructor(iterable: Sequence<T1>, private outer: Sequence<T2>, 
        // @ts-ignore
        private zipCondition: ZipCondition<T1, T2, TResult> = ((a: T1, b: T2) => [a, b] as TResult)) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const array = this.inner.toArray() as Array<T1>;
        const zipper = this.outer.toArray();

        if (array.length < zipper.length) {
            return array.map((item, index) => this.zipCondition(item, zipper[index]));
        } else {
            return zipper.map((item, index) => this.zipCondition(array[index], item));
        }
    }
}

export class JoinCollection<T1, T2, TKey, TResult> extends Sequence<TResult> {    
    public constructor(
        iterable: Sequence<T1>,
        private outer: Sequence<T2>, 
        private firstKey: MapCondition<T1, TKey>,
        private secondKey: MapCondition<T2, TKey>,
        private equalityComparer: IEqualityComparer<TKey> = new DefaultEqualityComparer<TKey>(),
        private zipFunc: ZipCondition<T1, T2, TResult>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const left = this.inner as ISequence<T1>;
        
        const right = this.outer.toLookup(this.secondKey, this.equalityComparer);

        const result = left.selectMany<[T1, T2]>(item => {
            const target = right.get(this.firstKey(item))

            if(target) {
                return combine(item, target);
            } else {
                return []
            }
        }).toArray().map<TResult>(item => this.zipFunc(item[0], item[1]))

        return result;
    }
}

export class GroupJoinCollection<T1, T2, TKey, TResult> extends Sequence<TResult> {    
    public constructor(
        iterable: Sequence<T1>,
        private outer: Sequence<T2>, 
        private firstKey: MapCondition<T1, TKey>,
        private secondKey: MapCondition<T2, TKey>,
        private equalityComparer: IEqualityComparer<TKey> = new DefaultEqualityComparer<TKey>(),
        private zipFunc: GroupJoinCondition<T1, T2, TResult>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const left = this.inner as ISequence<T1>;
        
        const right = this.outer.toLookup(this.secondKey, this.equalityComparer);

        const result = left.toArray().map<[T1, ISequence<T2>] | null>(item => {
            const target = right.get(this.firstKey(item))

            if(target.length > 0) {
                return [item, new Sequence(target)];
            } else {
                return null
            } 
        })
        .filter(item => item !== null)
        // @ts-ignore
        .map<TResult>(item => this.zipFunc(item[0], item[1]));

        return result;
    }
}

export class PrependCollection<T> extends Sequence<T> {    
    public constructor(iterable: Sequence<T>, private prepender: T) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const array = this.inner.toArray();
        const temp = Array.of(this.prepender);

        const result = temp.concat(array);

        return result;
    }
}

export class AppendCollection<T> extends Sequence<T> {    
    public constructor(iterable: Sequence<T>, private appender: T) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const array = this.inner.toArray();
        const temp = Array.of(this.appender);

        const result = array.concat(temp);

        return result;
    }
}

export class DefaultCollection<T> extends Sequence<T> {    
    private reserved: ISequence<T>;

    public constructor(iterable: Sequence<T>, reserved: T | T[] | ISequence<T>) {
        super(iterable);

        if(reserved instanceof Sequence) {
            this.reserved = reserved;
        } else if (Array.isArray(reserved)) {
            this.reserved = new Sequence(reserved);
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

export class UnionCollection<T> extends Sequence<T> {   
    public constructor(iterable: Sequence<T>, private outer: ISequence<T>, private comparer?: IEqualityComparer<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        if(this.comparer) {
            return this.inner.concat(this.outer).distinct(this.comparer).toArray();
        } else {
            return this.inner.concat(this.outer).distinct().toArray();
        }
    }
}

export class IntersectCollection<T> extends Sequence<T> {   
    public constructor(iterable: Sequence<T>, private outer: Sequence<T>, private comparer?: IEqualityComparer<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const first = this.inner.toArray();
        // @ts-ignore
        const second = this.outer.toHashSet(this.comparer);

        const result: T[] = [];

        for(let i = 0, len = first.length; i < len; i++) {
            if(second.contains(first[i])) {
                result.push(first[i])
            }
        }

        // @ts-ignore
        return new Sequence(result).distinct(this.comparer).toArray();
    }
}

export class ExceptCollection<T> extends Sequence<T> {   
    public constructor(iterable: Sequence<T>, private outer: ISequence<T>, private comparer?: IEqualityComparer<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const first = this.inner.toArray();
        // @ts-ignore
        const second = this.outer.toHashSet(this.comparer);

        const result: T[] = [];

        for(let i = 0, len = first.length; i < len; i++) {
            if(!second.contains(first[i])) {
                result.push(first[i])
            }
        }

        // @ts-ignore
        return new Sequence(result).distinct(this.comparer).toArray();
    }
}

export class PromisifyCollection<T> implements IPromiseMaterializeSequence<T>{
    private inner: Sequence<T>;

    public constructor(iterable: Sequence<T>) {
        this.inner = iterable;
    }

    toArray(): Promise<T[]> {
        return new Promise<T[]>(resolve => {
           const result = this.inner.toArray();

           resolve(result);
        });
    }

    toDictionary<TKey>(keySelector: MapCondition<T, TKey>): Promise<Dictionary<TKey, T>>;
    toDictionary<TKey>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): Promise<Dictionary<TKey, T>>;
    toDictionary<TKey, TElement>(keySelector: MapCondition<T, TKey>, elementSelector: MapCondition<T, TElement>): Promise<Dictionary<TKey, TElement>>;
    toDictionary<TKey, TElement>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, elementSelector: MapCondition<T, TElement>): Promise<Dictionary<TKey, TElement>>;
    toDictionary(keySelector, eqalityComparer?, elementSelector?): any {
        return new Promise<Dictionary<any, any>>(resolve => {
            const result = this.inner.toDictionary(keySelector, eqalityComparer || elementSelector, elementSelector);

            resolve(result);
        });
    }

    toHashSet(): Promise<HashSet<T>>;
    toHashSet(equalityComparer: IEqualityComparer<T>): Promise<HashSet<T>>;
    toHashSet(equalityComparer?: IEqualityComparer<T>): Promise<HashSet<T>> {
        return new Promise<HashSet<T>>(resolve => {
            // @ts-ignore
            const result = this.inner.toHashSet(equalityComparer);

            resolve(result);
        });
    }

    toLookup<TKey>(keySelector: MapCondition<T, TKey>): Promise<ILookup<TKey, T>>;
    toLookup<TKey>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): Promise<ILookup<TKey, T>>;
    toLookup<TKey, TElement>(keySelector: MapCondition<T, TKey>, elementSelector: MapCondition<T, TElement>): Promise<ILookup<TKey, TElement>>;
    toLookup<TKey, TElement>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, elementSelector: MapCondition<T, TElement>): Promise<ILookup<TKey, TElement>>;
    toLookup(keySelector, eqalityComparer?, elementSelector?): any {
        return new Promise<ILookup<any, any>>(resolve => {
            const result = this.inner.toLookup(keySelector, eqalityComparer || elementSelector, elementSelector);

            resolve(result);
        });
    }
}
