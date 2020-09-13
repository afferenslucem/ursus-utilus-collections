import { Exception } from "./exceptions/exceptions";
import { ReduceCondition, ReduceWithAccumulatorCondition, FilterCondition, MapCondition, EqualityCondition, CompareCondition, ServiceMapCondition, GroupJoinCondition, ZipCondition } from "./delegates";
import { equalityCompare } from "./utils/equality-compare";
import { IGroupedData } from "./interfaces/i-grouped-data";
import { ISortingCollection } from "./interfaces/i-sorting-collection";
import { SortDirection, SortSettings, Comparer } from "./utils/comparer";
import { combine, of } from "./utils/operators";
import { compare } from "./utils/compare";
import { ISequence } from "./interfaces/i-collection";

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

    public sequenceEqual(collection: T[] | ISequence<T>): boolean;
    public sequenceEqual(collection: T[] | ISequence<T>, comparer: EqualityCondition<T>): boolean;
    public sequenceEqual(collection: T[] | ISequence<T>, comparer: EqualityCondition<T> = equalityCompare): boolean {
        const arr1 = this.toArray();
        const arr2 = Array.isArray(collection) ? collection : collection.toArray();

        const len1 = arr1.length;
        const len2 = arr2.length;

        if (len1 !== len2) return false;

        return arr1.every((item, index) => comparer(item, arr2[index]));
    }

    public contains(element: T, condition: EqualityCondition<T> = equalityCompare): boolean {
        return this.toArray().some(item => condition(item, element));
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
    public distinct(comparer: EqualityCondition<T>): ISequence<T>
    public distinct(comparer?: EqualityCondition<T>): ISequence<T> {
        return new DistinctCollection(this, comparer);
    }
    
    public groupBy<TKey>(key: MapCondition<T, TKey>): ISequence<IGroupedData<TKey, ISequence<T>>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, group: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>>;
    public groupBy<TKey, TValue>(key: MapCondition<T, TKey>, group?: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>> {
        return new GroupingCollection<T, TKey, TValue>(this, key, group);
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
    public except(items: T[] | ISequence<T>, comparer: EqualityCondition<T>): ISequence<T>;
    public except(items: T[] | ISequence<T>, comparer?: EqualityCondition<T>): ISequence<T> {
        return new ExceptCollection(this, new Sequence(items), comparer);
    }

    public intersect(items: T[] | ISequence<T>): ISequence<T>;
    public intersect(items: T[] | ISequence<T>, comparer: EqualityCondition<T>): ISequence<T>;
    public intersect(items: T[] | ISequence<T>, comparer?: EqualityCondition<T>): ISequence<T> {
        return new IntersectCollection(this, new Sequence(items), comparer);
    }

    public groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ISequence<TResult> {
        return new GroupJoinCollection<T, T2, TKey, TResult>(this, new Sequence(iterable), firstKey, secondKey, zipFunc);
    }

    public join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult> {
        return new JoinCollection<T, T2, TKey, TResult>(this, new Sequence(iterable), firstKey, secondKey, zipFunc);
    }

    public union(items: T[] | ISequence<T>): ISequence<T>;
    public union(items: T[] | ISequence<T>, comparer: EqualityCondition<T>): ISequence<T>;
    public union(items: T[] | ISequence<T>, comparer?: EqualityCondition<T>): ISequence<T> {
        return new UnionCollection(this, new Sequence(items), comparer);
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

    public toLookup<TKey>(key: MapCondition<T, TKey>): Map<TKey, T[]>;
    public toLookup<TKey, TValue>(key: MapCondition<T, TKey>, value: MapCondition<T, TValue>): Map<TKey, TValue[]>;
    public toLookup<TKey, TValue = T>(key: MapCondition<T, TKey>, value?: MapCondition<T, TValue>): Map<TKey, TValue[]> {
        const grouped = value != null ? 
            // @ts-ignore
            this.groupBy(key, group => group.select<TValue>(value).toArray()) :
            this.groupBy(key, group => group.toArray());
        
        const materialized = grouped.toArray();

        const result = new Map<TKey, TValue[] | T[]>();

        for(let i = 0, len = materialized.length; i < len; i++) {
            result.set(materialized[i].key, materialized[i].group)
        }

        // @ts-ignore
        return result;
    }

    public toMap<TKey>(key: MapCondition<T, TKey>): Map<TKey, T>;
    public toMap<TKey, TValue>(key: MapCondition<T, TKey>, value: MapCondition<T, TValue>): Map<TKey, TValue>;
    public toMap<TKey, TValue = T>(key: MapCondition<T, TKey>, value?: MapCondition<T, TValue>): Map<TKey, TValue> {
        const grouped = value != null ? 
            // @ts-ignore
            this.groupBy(key, group => group.select<TValue>(value).first()) :
            this.groupBy(key, group => group.first());
        
        const materialized = grouped.toArray();

        const result = new Map<TKey, TValue | T>();

        for(let i = 0, len = materialized.length; i < len; i++) {
            result.set(materialized[i].key, materialized[i].group)
        }

        // @ts-ignore
        return result;
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

    protected materialize(): T[] {
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

    // @ts-ignore
    public select<TOut>(condition: MapCondition<T, TOut>): ISequence<TOut> {
        // @ts-ignore
        const result = new MappingCollection<T, V>(this.inner, (item: T) => condition(this.condition(item)));

        // @ts-ignore
        return result;
    }

    // @ts-ignore
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

    // @ts-ignore
    public selectMany<TOut>(condition: MapCondition<T, TOut[]>): ISequence<TOut> {
        // @ts-ignore
        const result = new MappingManyCollection<T, T2>(this.inner, (item: T) => condition(this.condition(item)));

        // @ts-ignore
        return result;
    }

    // @ts-ignore
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

interface IDictionary<TKey, TValue> {
    // @ts-ignore
    [id: TKey] : TValue
}

export class GroupingCollection<T, TKey, TValue = ISequence<T>> extends Sequence<IGroupedData<TKey, TValue>> {    
    public constructor(iterable: Sequence<T>, private key: MapCondition<T, TKey>, private groupMapping?: MapCondition<ISequence<T>, TValue>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): IGroupedData<TKey, TValue>[] {
        // @ts-ignore
        const array = this.inner.toArray() as T[];
        // @ts-ignore
        const storage = array.reduce<IDictionary<TKey, [TKey, TValue[]]>>(
            (acc: IDictionary<TKey, [TKey, TValue[]]>, item: T) => {
            const key = this.key(item);

            // @ts-ignore
            let data = acc[key];

            if (data) {
                // @ts-ignore
                data[1].push(item)
            } else {
                // @ts-ignore
                data = [key, [item]];
                // @ts-ignore
                acc[key] = data;
            }

            return acc;
        }, {})

        if(this.groupMapping) {
            // @ts-ignore
            return Object.entries(storage).map(item => ({
                key: item[1][0],
                // @ts-ignore
                group: this.groupMapping(new Sequence(item[1][1]))
            }))
        } else {
            // @ts-ignore
            return Object.entries(storage).map(item => ({
                key: item[1][0],
                group: new Sequence(item[1][1])
            }));
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
    public constructor(iterable: Sequence<T>, private comparer?: EqualityCondition<T>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): T[] {
        if(this.comparer) {
            const result: T[] = [];
    
            const array = this.inner.toArray();
    
            for(let i = 0, len = array.length; i < len; i++) {
                // @ts-ignore
                if(result.some(item => this.comparer(item, array[i]))) {
                    continue;
                } else {
                    result.push(array[i])
                }
            }
    
            return result;
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
        private zipFunc: ZipCondition<T1, T2, TResult>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const left = this.inner as ISequence<T1>;
        
        const right = this.outer.groupBy(this.secondKey).toArray().reduce((map, item) => {
            map.set(item.key, item.group);
            return map;
        }, new Map<TKey, ISequence<T2>>());

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
        private zipFunc: GroupJoinCondition<T1, T2, TResult>) {
        // @ts-ignore
        super(iterable);
    }

    protected materialize(): Array<TResult> {
        // @ts-ignore
        const left = this.inner as ISequence<T1>;
        
        const right = this.outer.groupBy(this.secondKey).toArray().reduce((map, item) => {
            map.set(item.key, item.group);
            return map;
        }, new Map<TKey, ISequence<T2>>());

        const result = left.toArray().map<[T1, ISequence<T2>] | null>(item => {
            const target = right.get(this.firstKey(item))

            if(target) {
                return [item, target];
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
    public constructor(iterable: Sequence<T>, private outer: ISequence<T>, private comparer?: EqualityCondition<T>) {
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
    public constructor(iterable: Sequence<T>, private outer: Sequence<T>, private comparer?: EqualityCondition<T>) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const first = this.inner.toArray();
        const second = this.outer.toArray();

        const result: T[] = [];

        const comparer = this.comparer || equalityCompare;

        for(let i = 0, len = first.length; i < len; i++) {
            if(second.some(item => comparer(first[i], item))) {
                result.push(first[i])
            }
        }

        if(this.comparer) {
            return new Sequence(result).distinct(this.comparer).toArray();
        } else {
            return new Sequence(result).distinct().toArray();
        }
    }
}

export class ExceptCollection<T> extends Sequence<T> {   
    public constructor(iterable: Sequence<T>, private outer: ISequence<T>, private comparer: EqualityCondition<T> = equalityCompare) {
        super(iterable);
    }

    protected materialize(): Array<T> {
        const first = this.inner.toArray();
        const second = this.outer.toArray();

        const result: T[] = [];

        const comparer = this.comparer || equalityCompare;

        for(let i = 0, len = first.length; i < len; i++) {
            if(!second.some(item => comparer(first[i], item))) {
                result.push(first[i])
            }
        }

        if(this.comparer) {
            return new Sequence(result).distinct(this.comparer).toArray();
        } else {
            return new Sequence(result).distinct().toArray();
        }
    }
}