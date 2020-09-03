import { FilterCondition } from "../../../commands/delegates";
import { AllAlgorthm } from "../all.algorithm";

export class AllCustomAlgorithm<T> extends AllAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): boolean {
        for(let i = 0; i < array.length; i++) {
            if(!filter(array[i])) return false;
        }
        
        return true;
    }
}