import { ICollection } from "./i-collection";
import { SortCondition, MapCondition } from "../commands/delegates";

export interface ISortingCollection<T> extends ICollection<T> {
    thenBy<E>(map: MapCondition<T, E>, condition?: SortCondition<E>): ISortingCollection<T>;
}