import { ReduceWithAccumulatorCondition } from "../../../commands/delegates";
import { ReduceAlgorthm } from "../reduce.algorithm";

export class ReduceWithAccumulatorCustomAlgorithm<T, V = T> extends ReduceAlgorthm<T, V> {
    public run<V = T>(array: T[], predicate: ReduceWithAccumulatorCondition<T, V>, acc: V): V {
        // @ts-ignore
        let result: V = acc;

        for(let i = 0, len = array.length; i < len; i++) {
            result = predicate(result, array[i])
        }

        return result;
    }
}