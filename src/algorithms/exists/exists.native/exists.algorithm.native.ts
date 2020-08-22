import { FilterCondition } from "../../../commands/delegates";
import { ExistsAlgorthm } from "../exists.algorithm";

export class ExistsNativeAlgorithm<T> extends ExistsAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): boolean {
        return array.some(filter);
    }
}