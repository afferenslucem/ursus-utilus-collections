import { ReduceCondition, ReduceWithAccumulatorCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";
import { ReduceAggregator } from "./reduce/reduce-aggregator";

export class SumByAggregator<T, V = T> extends ReduceAggregator<V> {
    public constructor(collection: ICollection<T>, predicate: ReduceWithAccumulatorCondition<T, V>){
        // @ts-ignore
        super(collection, predicate);
    }
}