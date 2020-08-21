import { IAlgorithm } from "../i-algorithm";
import { MapCondition } from "../../commands/delegates";

export abstract class DistinctByAlgorthm<T> implements IAlgorithm<T[]> {
    // @ts-ignore
    public abstract run<V>(array: T[], map: MapCondition<T, V>): T[];
}