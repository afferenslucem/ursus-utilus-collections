import { ReduceAggregator } from "./reduce-aggregator";
import { CompareCondition, FilterCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";
import { Aggregator } from "./aggregator";

export class CountAggregator<T> extends Aggregator<number> {
    public constructor(private collection: ICollection<T>, private condition?: FilterCondition<T>) {
        super()
    }
    
    public aggregate(): number {
        return (this.condition ? 
            this.collection.where(this.condition) : 
            this.collection).toArray().length;
    }
}