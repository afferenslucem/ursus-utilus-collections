import { NativeArrayWrapper } from "./native-array-wrapper";
import { IterableCollection } from "./iterable-collection";
import { Command } from "../commands/command";
import { ICollection } from "../interfaces/i-collection";
import { FilterCondition, filter, MapCondition, map } from "../commands/delegates";
import { IIterator } from "../interfaces/i-iterator";
import { CommandId } from "../commands/command-id";
import { IIterable } from "../interfaces/i-iterable";

export class Collection<T> extends IterableCollection<T> implements ICollection<T> {
    protected commands: Command[];

    public constructor(iterable: T[] | IterableCollection<T> | IIterator<T>) {
        if(Array.isArray(iterable)) {
            const copy = Array.from(iterable);
            const wrapper = new NativeArrayWrapper<T>(...copy);
            const iterator = wrapper.getIterator();
            super(iterator)
        } else if (iterable instanceof IterableCollection) {
            const iterator = iterable.getIterator();
            super(iterator);
        } else {
            super(iterable)
        }

        this.commands = [];
    }

    where(condition: FilterCondition<T>): ICollection<T> {
        const result = this.deepCopy();

        result.commands.push({
            id: CommandId.Filter,
            function: (items: T[]) => filter<T>(items, condition)
        });

        return result;
    }

    select<TExt>(condition: MapCondition<T, TExt>): ICollection<TExt> {
        const result = this.deepCopy();

        result.commands.push({
            id: CommandId.Filter,
            function: (items: T[]) => map<T,TExt>(items, condition)
        });

        // @ts-ignore
        return result;
    }

    protected deepCopy(): Collection<T> {
        const result = new Collection<T>(this.iterator);
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
}