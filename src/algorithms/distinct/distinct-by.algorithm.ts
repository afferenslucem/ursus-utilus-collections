import { IAlgorithm } from "../i-algorithm";
import { EqualityCondition } from "../../commands/delegates";
import { AnyAlgorthm } from "../any/any.algorithm";

export abstract class DistinctByAlgorthm<T> implements IAlgorithm<T[]> {
    protected constructor(private any: AnyAlgorthm<T>){

    }

    public run(array: T[], equalityCondition: EqualityCondition<T>): T[] {
        const result: T[] = [];

        for(let i = 0; i < array.length; i++) {
            if(this.any.run(result, item => equalityCondition(item, array[i]))) {
                continue;
            } else {
                result.push(array[i])
            }
        }

        return result;
    }
}