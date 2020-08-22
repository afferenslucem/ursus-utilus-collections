import { FilterCondition } from "../../../commands/delegates";
import { ExistsAlgorthm } from "../exists.algorithm";

export class ExistsCustomAlgorithm<T> extends ExistsAlgorthm<T> {
    public run(array: T[], filter: FilterCondition<T>): boolean {
        for(let i = 0; i < array.length; i++) {
            if(filter(array[i])) return true;
        }
        
        return false;
    }
}