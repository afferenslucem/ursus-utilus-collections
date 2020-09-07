import { ICollection } from "../..";
import { Aggregator } from "../aggregator";
import { Exception } from "../../exceptions/exceptions";


export class SingleAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>) {
        super()
    }

    public aggregate(): T {
        const array = this.collection.toArray();

        if(array.length != 1) {
            throw new Error(Exception.SoManyElements);
        } else {
            return array[0];
        }
    }
}