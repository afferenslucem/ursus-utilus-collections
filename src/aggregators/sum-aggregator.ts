import { Aggregator } from "./aggregator";
import { ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";
import { ReduceAggregator } from "./reduce-aggregator";

function getDefaultFunc<T, V>(arg: T | undefined): ReduceCondition<T, V> {
    switch(typeof arg) {
        default: {
            //@ts-ignore
            return (a, b) => a + b
        }
    }
}

export class SumAggregator<T, V = T> extends ReduceAggregator<V> {
    public constructor(collection: ICollection<T>, predicate?: ReduceCondition<T, V>){
        // @ts-ignore
        super(collection, predicate ? predicate : getDefaultFunc(undefined));
    }
}