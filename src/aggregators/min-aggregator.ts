import { ReduceAggregator } from "./reduce-aggregator";
import { CompareCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";

const $default: CompareCondition<any> = (first, second) => Number(first - second);

export class MinAggregator<T> extends ReduceAggregator<T> {
    public constructor(collection: ICollection<T>, condition?: CompareCondition<T>) {
        super(collection, (first, second) => this.compare(first, second, condition || $default))
    }

    private compare(first: T, second: T, func: CompareCondition<T>): T {
        return func(first, second) < 0 ? first : second;
    }
}