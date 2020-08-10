import { IIteratorData } from "../interfaces/i-iterator-data";
import { IteratorWrapper } from "./iterator-wrapper";
import { FilterCondition } from "../commands/delegates";
import { IIterator } from "../interfaces/i-iterator";

export class FilteringIterator<T> extends IteratorWrapper<T> {
    private conditions: FilterCondition<T>[];

    public constructor(iterator: IIterator<T>, ...conditions: FilterCondition<T>[]) {
        super(iterator);
        this.conditions = conditions;
    }

    public next(): IIteratorData<T> {
        let result: IIteratorData<T> | null = null;
        
        do {
            result = this.inner.next();
            // @ts-ignore
        } while(!(result.done || this.checkCondition(result.value)));

        return result;
    }

    private checkCondition(item: T): boolean {
        return this.conditions.every(condition => condition(item));
    }
}