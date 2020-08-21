import { FilterAlgorthm } from "../filter.algorithm";
import { FilterCondition } from "../../../commands/delegates";

export class FilterNativeAlgorithm<T> extends FilterAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): T[] {
        return array.filter(filter);
    }
}