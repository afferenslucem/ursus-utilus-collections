import { Aggregator } from "./aggregator";
import { ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";
import { MATERIALIZE_TYPE_TRESHOLD } from "../MATERIALIZE_TYPE_TRESHOLD";

export class ReduceAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, protected predicate: ReduceCondition<T>){
        super();
    }

    public aggregate(accumulator?: T): T {
        const array = this.collection.toArray();
        if(array.length < MATERIALIZE_TYPE_TRESHOLD) {
            // @ts-ignore
            return accumulator != null ? array.reduce((a, b) => this.predicate(a, b), accumulator) : array.reduce((a, b) => this.predicate(a, b));
        } else if(accumulator != null) {
            return this.arrvegateWithAccumulator(array, accumulator);
        } else {
            return this.arrvegateWithoutAccumulator(array);
        }
    }

    private arrvegateWithAccumulator(array: T[], accumulator: T): T {
        let result = accumulator;

        for(let i = 0, len = array.length; i < len; i++) {
            result = this.predicate(result, array[i])
        }

        return result;
    }

    private arrvegateWithoutAccumulator(array: T[]): T {
        let result = array[0];

        for(let i = 1, len = array.length; i < len; i++) {
            result = this.predicate(result, array[i])
        }

        return result;
    }
}