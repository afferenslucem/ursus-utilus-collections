import { ICollection } from "./i-collection";
import { CompareCondition, MapCondition } from "../commands/delegates";

export interface ISortingCollection<T> extends ICollection<T> {
    
    /**
     * Sorts items
     * @param map Property taking function
     * @param condition Comparing function
     */
    thenBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E>): ISortingCollection<T>;
}