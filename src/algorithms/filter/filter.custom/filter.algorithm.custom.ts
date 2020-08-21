import { FilterAlgorthm } from "../filter.algorithm";
import { FilterCondition } from "../../../commands/delegates";

export class FilterCustomAlgorithm<T> extends FilterAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): T[] {
        const result = [];

        for(let i = 0; i < array.length; i++) {
            let item = array[i];
            if(filter(item)) {
                result.push(item);
            }
        }

        return result;
    }
}