import { Aggregator } from "./aggregator";
import { ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";
import { ReduceAggregator } from "./reduce-aggregator";

export class SumAggregator<T, V = T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>){
        super();
    }    

    public aggregate(): T {
        const array = this.collection.toArray();
        let result = array[0];

        for(let i = 1, len = array.length; i < len; i++) {
            // @ts-ignore
            result = result + array[i]
        }

        return result;
    }
}
