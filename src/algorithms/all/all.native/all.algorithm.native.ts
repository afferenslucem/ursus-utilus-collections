import { FilterCondition } from "../../../commands/delegates";
import { AllAlgorthm } from "../all.algorithm";

export class AllNativeAlgorithm<T> extends AllAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): boolean {
        return array.every(filter);
    }
}