import { FilterCondition } from "../../commands/delegates";
import { ICollection } from "../../interfaces/i-collection";
import { Aggregator } from "../aggregator";
import { AnyCustomAlgorithm } from "../../algorithms/any/any.custom/any.algorithm.custom";

export class AnyAggregator<T> extends Aggregator<boolean> {
    public constructor(private collection: ICollection<T>, private condition: FilterCondition<T>) {
        super()
    }

    public aggregate(): boolean {
        const array = this.collection.toArray();

        const algo = new AnyCustomAlgorithm<T>();

        return algo.run(array, this.condition);
    }
}