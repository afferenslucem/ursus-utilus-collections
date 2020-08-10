import { IIteratorData } from "../interfaces/i-iterator-data";
import { IteratorWrapper } from "./iterator-wrapper";
import { MapCondition } from "../commands/delegates";
import { IIterator } from "../interfaces/i-iterator";

export class MappingIterator<T, E> extends IteratorWrapper<E> {
    private conditions: MapCondition<T, E>[];

    public constructor(iterator: IIterator<E>, ...conditions: MapCondition<T, E>[]) {
        super(iterator);
        this.conditions = conditions;
    }

    public next(): IIteratorData<E> {
        const next = this.inner.next();

        if (next.done) {
            return next;
        }
        
        // @ts-ignore
        const result = this.applyConditions(next.value);

        return {
            value: result,
            done: next.done
        }
    }

    private applyConditions(item: T): E {
        let result: any = item;

        this.conditions.forEach(condition => {
            result = condition(result)
        });

        return result;
    }
}