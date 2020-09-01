import { FilterCondition } from "../../../commands/delegates";
import { AnyAlgorthm } from "../any.algorithm";

export class AnyCustomAlgorithm<T> extends AnyAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): boolean {
        for(let i = 0; i < array.length; i++) {
            if(filter(array[i])) return true;
        }
        
        return false;
    }
}