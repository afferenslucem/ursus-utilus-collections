import { Aggregator } from "../aggregator";
import { ICollection } from "../..";
import { ReduceCondition } from "../../commands/delegates";
import { ReduceCustomAlgorithm } from "../../algorithms/reduce/reduce.custom/reduce.algorithm.custom";
import { ReduceNativeAlgorithm } from "../../algorithms/reduce/reduce.native/reduce.algorithm.native";
import { ReduceWithAccumulatorCustomAlgorithm } from "../../algorithms/reduce/reduce-with-accumulator.custom/reduce-with-accumulator.algorithm.custom";
import { ReduceWithAccumulatorNativeAlgorithm } from "../../algorithms/reduce/reduce-with-accumulator.native/reduce-with-accumulator.algorithm.native";
import { IAlgorithm } from "../../algorithms/i-algorithm";
import { AlgorithmSolver } from "../../algorithms/solvers/algoritm-solver";

export class ReduceAggregator<T, V = T> extends Aggregator<V> {
    public constructor(private collection: ICollection<T>, protected predicate: ReduceCondition<T, V>, protected accumulator?: V){
        super();
    }

    public aggregate(): V {
        const array = this.collection.toArray();

        const algo = this.chooseAlgorithm<V>(array);

        return algo.run(array, this.predicate, this.accumulator);
    }

    protected chooseAlgorithm<V>(array: T[]): IAlgorithm<V> {
        if(!this.accumulator) {
            return new AlgorithmSolver().solve(new ReduceCustomAlgorithm<T, V>(), new ReduceNativeAlgorithm<T, V>(), array);
        } else {
            // @ts-ignore
            return new AlgorithmSolver().solve(new ReduceWithAccumulatorCustomAlgorithm<T, V>(), new ReduceWithAccumulatorNativeAlgorithm<T, V>(), array);
        }
    }
}