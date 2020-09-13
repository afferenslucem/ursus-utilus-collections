import { ISequence } from "./i-collection";
import { CompareCondition, MapCondition } from "../delegates";

export interface ISortingCollection<T> extends ISequence<T> {
    
    /**
     * Sorts items
     * @param map Property taking function
     * @param condition Comparing function
     */
    thenBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E>): ISortingCollection<T>;
    
    /**
     * Sorts items descending
     * @param map Property taking function
     * @param condition Comparing function
     */
    thenByDescending<E>(map: MapCondition<T, E>, condition?: CompareCondition<E>): ISortingCollection<T>;
}