import { FilterCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";
import { Aggregator } from "./aggregator";

export class ExistsAggregator<T> extends Aggregator<boolean> {
    public constructor(private collection: ICollection<T>, private condition: FilterCondition<T>) {
        super()
    }

    public aggregate(): boolean {
        return this.collection.toArray().some(this.condition);
    }
}