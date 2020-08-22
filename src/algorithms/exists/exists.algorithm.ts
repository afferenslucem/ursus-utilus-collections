import { FilterCondition } from "../../commands/delegates";
import { IAlgorithm } from "../i-algorithm";

export abstract class ExistsAlgorthm<T> implements IAlgorithm<boolean> {
    public abstract run(array: T[], map: FilterCondition<T>): boolean;
}