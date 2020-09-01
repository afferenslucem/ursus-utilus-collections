import { Aggregator } from "../aggregator";
import { ICollection } from "../../interfaces/i-collection";

export class SumAggregator<T, V = T> extends Aggregator<number> {
    public constructor(private collection: ICollection<number>){
        super();
    }    

    public aggregate(): number {
        const array = this.collection.toArray();
        let result = <number> array[0];

        for(let i = 1, len = array.length; i < len; i++) {
            result = result + array[i]
        }

        return result;
    }
}
