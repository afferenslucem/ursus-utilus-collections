import { Aggregator } from "../aggregator";
import { ICollection } from "../..";
import { FilterCondition } from "../../commands/delegates";
import { Exception } from "../../exceptions/exceptions";


export class LastAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, protected predicate?: FilterCondition<T> | undefined){
        super();
    }

    public aggregate(): T {
        const result = this.getResult();

        if (result.length == 0) {
            throw Exception.NoMatches;
        } else {
            // @ts-ignore
            return result[result.length - 1];
        }
    }

    private getResult(): T[] {
        return this.predicate ? 
        this.collection.where(this.predicate).toArray() :
        this.collection.toArray();
    }
}