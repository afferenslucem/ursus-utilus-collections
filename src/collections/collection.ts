import { NativeArrayWrapper } from "./native-array-wrapper";
import { IterableCollection } from "./iterable-collection";
import { Command } from "../commands/command";
import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, filter, MapCondition, map } from "../commands/delegates";
import { IIterator } from "../interfaces/i-iterator";
import { CommandId } from "../commands/command-id";
import { IIterable } from "../interfaces/i-iterable";
import { FilteringIterator } from "../iterators/filtering-iterator";

export class Collection<T> extends IterableCollection<T> implements ICollection<T> {
    protected commands: Command[];
    private inner: IterableCollection<T>;

    public constructor(iterable: T[] | IterableCollection<T>) {
        super();

        if(Array.isArray(iterable)) {
            const copy = Array.from(iterable);
            this.inner = new NativeArrayWrapper<T>(...copy);
        } else {
            this.inner = iterable;
        }

        this.commands = [];
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        const result = new FilteringCollection<T>(this, condition);

        return result;
    }

    select<TOut>(condition: MapCondition<T, TOut>): ICollection<TOut> {
        const result = this.deepCopy();

        result.commands.push({
            id: CommandId.Map,
            function: (items: T[]) => map<T,TOut>(items, condition)
        });

        // @ts-ignore
        return result;
    }

    skip(): ICollection<T> {
        
    }

    protected deepCopy(): Collection<T> {
        const result = new Collection<T>(this);
        result.commands = Array.from(this.commands);

        return result;
    }

    public toArray(): T[] {
        let result: IIterable<any> = this;

        this.commands.forEach(item => {
            result = this.applyCommand(item, result);
        })

        return Array.from(result)
    }

    private applyCommand(command: Command, iterable: Iterable<any>): IIterable<any> {
        const result = command.function(Array.from(iterable));

        return new NativeArrayWrapper(...result);
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
        result.commands = Array.from(this.commands);

        return result;
    }
}