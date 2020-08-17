import { Aggregator } from "./aggregator";
import { ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";

export class ReduceAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, protected predicate: ReduceCondition<T>){
        super();
    }

    public aggregate(): T {
        const array = this.collection.toArray();
        let result = array[0];

        for(let i = 1, len = array.length; i < len; i++) {
            result = this.predicate(result, array[i])
        }

        return result;
    }
}