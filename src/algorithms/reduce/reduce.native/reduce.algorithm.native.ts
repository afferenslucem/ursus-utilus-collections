import { ReduceWithAccumulatorCondition } from "../../../commands/delegates";
import { ReduceAlgorthm } from "../reduce.algorithm";

export class ReduceNativeAlgorithm<T, V = T> extends ReduceAlgorthm<T, V> {
    public run<V = T>(array: T[], predicate: ReduceWithAccumulatorCondition<T, V>): V {
        // @ts-ignore
        return array.reduce((a, b) => predicate(a, b));
    }
}