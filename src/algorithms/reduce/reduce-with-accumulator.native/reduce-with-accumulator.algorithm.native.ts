import { ReduceCondition } from "../../../commands/delegates";
import { ReduceAlgorthm } from "../reduce.algorithm";

export class ReduceWithAccumulatorNativeAlgorithm<T, V = T> extends ReduceAlgorthm<T, V> {
    public run<V = T>(array: T[], predicate: ReduceCondition<T, V>, acc: V): V {
        // @ts-ignore
        return array.reduce((a, b) => predicate(a, b), acc);
    }
}