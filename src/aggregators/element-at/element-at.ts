import { Aggregator } from "../aggregator";
import { ICollection } from "../../interfaces/i-collection";
import { Exception } from "../../exceptions/exceptions";

export class ElementAtAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, private position: number){
        super();
    }

    public aggregate(): T {
        const result = this.collection.toArray();

        if (result.length > this.position && result.length !== 0) {
            return result[this.position];
        } else {
            throw Exception.NoMatches;
        }
    }
}