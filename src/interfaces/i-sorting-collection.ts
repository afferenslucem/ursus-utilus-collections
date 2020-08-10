import { ICollection } from "./i-collection";
import { SortCondition, MapCondition } from "../commands/delegates";

export interface ISortingCollection<T> extends ICollection<T> {
    
    /**
     * Sorts items
     * @param map Property taking function
     * @param condition Comparing function
     */
    thenBy<E>(map: MapCondition<T, E>, condition?: SortCondition<E>): ISortingCollection<T>;
}