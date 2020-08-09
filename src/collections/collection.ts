import { NativeArrayWrapper } from "./native-array-wrapper";
import { IterableCollection } from "./iterable-collection";
import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, MapCondition } from "../commands/delegates";
import { IIterator } from "../interfaces/i-iterator";
import { FilteringIterator } from "../iterators/filtering-iterator";
import { MappingIterator } from "../iterators/mapping-iterator";
import { SkippingIterator } from "../iterators/skipping-iterator";
import { TakingIterator } from "../iterators/taking-iterator";

export class Collection<T> extends IterableCollection<T> implements ICollection<T> {
    private inner: IterableCollection<T>;

    public constructor(iterable: T[] | IterableCollection<T>) {
        super();

        if(Array.isArray(iterable)) {
            const copy = Array.from(iterable);
            this.inner = new NativeArrayWrapper<T>(...copy);
        } else {
            this.inner = iterable;
        }
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        return new FilteringCollection<T>(this, condition);
    }

    select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {        
        return new MappingCollection<T, TOut>(this, condition);
    }

    skip(shouldSkip: number): ICollection<T> {
        return new SkippingCollection(this, shouldSkip);
    }

    take(shouldTake: number): ICollection<T> {
        return new TakingCollection(this, shouldTake);
    }

    protected deepCopy(): Collection<T> {
        const result = new Collection<T>(this);

        return result;
    }

    public toArray(): T[] {
        // @ts-ignore
        return Array.from<T>(this)
    }

    public getIterator(): IIterator<T> {
        return this.inner.getIterator();
    }
}

class FilteringCollection<T> extends Collection<T> {
    private conditions: FilterCondition<T>[];

    public constructor(iterable: IterableCollection<T>, ...conditions: FilterCondition<T>[]) {
        super(iterable);
        this.conditions = [...conditions];
    }
    
    public getIterator(): IIterator<T> {
        const iterator = super.getIterator();

        return new FilteringIterator(iterator, ...this.conditions);
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        const copy = this.deepCopy();
        
        copy.appendConndition(condition);

        return copy;
    }

    public appendConndition(condition: FilterCondition<T>) {
        this.conditions.push(condition);
    }

    protected deepCopy(): FilteringCollection<T> {
        const result = new FilteringCollection<T>(this, ...this.conditions);

        return result;
    }
}

class MappingCollection<T, E> extends Collection<E> {
    private conditions: MapCondition<T, E>[];

    public constructor(iterable: IterableCollection<T>, ...conditions: MapCondition<T, E>[]) {
        // @ts-ignore
        super(iterable);
        this.conditions = [...conditions];
    }
    
    public getIterator(): IIterator<E> {
        const iterator = super.getIterator();

        return new MappingIterator(iterator, ...this.conditions);
    }

    public appendConndition(condition: MapCondition<T, E>) {
        this.conditions.push(condition);
    }

    protected deepCopy(): MappingCollection<T, E> {
        // @ts-ignore
        const result = new MappingCollection<T, E>(this, ...this.conditions);

        return result;
    }
}

export class SkippingCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T>, private shouldSkip: number) {
        super(iterable);
    }

    public getIterator(): IIterator<T> {
        const iterator = super.getIterator();

        return new SkippingIterator(iterator, this.shouldSkip);
    }
}

export class TakingCollection<T> extends Collection<T> {
    public constructor(iterable: IterableCollection<T>, private shouldTake: number) {
        super(iterable);
    }

    public getIterator(): IIterator<T> {
        const iterator = super.getIterator();

        return new TakingIterator(iterator, this.shouldTake);
    }
}