import { FilterCondition } from "../../../commands/delegates";
import { AnyAlgorthm } from "../any.algorithm";

export class AnyNativeAlgorithm<T> extends AnyAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): boolean {
        return array.some(filter);
    }
}