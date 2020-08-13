import { Aggregator } from "./aggregator";
import { ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";

function getDefaultFunc<T, V>(arg: T | undefined): ReduceCondition<T, V> {
    switch(typeof arg) {
        default: {
            //@ts-ignore
            return (a, b) => a + b
        }
    }
}

export class SumAggregator<T, V = T> extends Aggregator<V> {
    public constructor(private collection: ICollection<T>, protected predicate?: ReduceCondition<T, V>){
        super();
        if(!this.predicate) {
            // @ts-ignore
            this.predicate = getDefaultFunc(undefined);
        }
    }

    public aggregate(): V {
        // @ts-ignore
        return this.collection.toArray().reduce((first, second) => this.predicate(first, second))
    }
}