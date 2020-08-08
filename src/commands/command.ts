import { CommandId } from "./command-id";
import { FilterCondition, MapCondition } from "./delegates";
import { IIterable } from "../interfaces/i-iterable";

export interface Command {
    id: CommandId;
    function: FilterCondition<any> | MapCondition<any, any> | any
}

export abstract class Command2<T> {
    public abstract execute(seq: IIterable<T>): any;
}

export class FilterCommand<T> extends Command2<T> {
    public constructor(private condition: FilterCondition<T>) {
        super();
    }

    public execute(seq: IIterable<T>) {
        throw new Error("Method not implemented.");
    }
}