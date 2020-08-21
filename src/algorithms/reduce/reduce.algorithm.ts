import { IAlgorithm } from "../i-algorithm";
import { MapCondition, ReduceCondition } from "../../commands/delegates";

export abstract class ReduceAlgorthm<T, V> implements IAlgorithm<V[]> {
    // @ts-ignore
    public abstract run<V>(array: T[], reduce: ReduceCondition<T, V>, acc: V): V;
}