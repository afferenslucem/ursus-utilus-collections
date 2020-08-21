import { ReduceAggregator } from "./reduce-aggregator";
import { CompareCondition, ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";

function getDefaultFunc<T>(arg: T): ReduceCondition<T> {
    switch(typeof arg) {
        case 'number': {
            //@ts-ignore
            return Math.min
        }
        case "string": {
            //@ts-ignore
            return (a, b) => a < b ? a : b
        }
        default: {
            //@ts-ignore
            return (a, b) => a < b ? a : b
        }
    }
}

export class MinAggregator<T> extends ReduceAggregator<T> {
    public constructor(collection: ICollection<T>, condition?: CompareCondition<T>) {
        const arg = collection.first();
        super(collection, condition ? (first, second) => this.compare(first, second, condition) : getDefaultFunc(arg))
    }

    private compare(first: T, second: T, func: CompareCondition<T>): T {
        return func(first, second) < 0 ? first : second;
    }
}