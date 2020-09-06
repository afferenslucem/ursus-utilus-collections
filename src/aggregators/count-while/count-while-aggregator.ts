import { ICollection } from "../../interfaces/i-collection";
import { Aggregator } from "../aggregator";
import { FilterCondition } from "../../commands/delegates";

export class CountWhileAggregator<T> extends Aggregator<number> {
    public constructor(private collection: ICollection<T>, private condition: FilterCondition<T>) {
        super()
    }
    
    public aggregate(): number {
        const array = this.collection.toArray();

        let count = 0;

        while(this.condition(array[count])){
            count++;
        }

        return count;
    }
}