import { IAlgorithm } from "../i-algorithm";
import { MapCondition } from "../../commands/delegates";

export abstract class MapAlgorthm<T, V> implements IAlgorithm<V[]> {
    // @ts-ignore
    public abstract run<V>(array: T[], map: MapCondition<T, V>): V[];
}