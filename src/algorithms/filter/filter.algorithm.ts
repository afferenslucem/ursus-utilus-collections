import { IAlgorithm } from "../i-algorithm";
import { MapCondition, FilterCondition } from "../../commands/delegates";

export abstract class FilterAlgorthm<T> implements IAlgorithm<T[]> {
    // @ts-ignore
    public abstract run(array: T[], filter: FilterCondition<T>): T[];
}