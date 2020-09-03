import { ReduceCondition, ReduceWithAccumulatorCondition } from "../../../commands/delegates";
import { ReduceAlgorthm } from "../reduce.algorithm";

export class ReduceCustomAlgorithm<T, V = T> extends ReduceAlgorthm<T, V> {
    public run<V = T>(array: T[], predicate: ReduceWithAccumulatorCondition<T, V>): V {
        // @ts-ignore
        let result: V = array[0];

        for(let i = 1, len = array.length; i < len; i++) {
            result = predicate(result, array[i])
        }

        return result;
    }
}