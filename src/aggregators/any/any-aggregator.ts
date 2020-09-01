import { FilterCondition } from "../../commands/delegates";
import { ICollection } from "../../interfaces/i-collection";
import { Aggregator } from "../aggregator";
import { IAlgorithm } from "../../algorithms/i-algorithm";
import { ExistsCustomAlgorithm } from "../../algorithms/exists/exists.custom/exists.algorithm.custom";
import { ExistsNativeAlgorithm } from "../../algorithms/exists/exists.native/exists.algorithm.native";
import { AlgorithmSolver } from "../../algorithms/solvers/algoritm-solver";

export class AnyAggregator<T> extends Aggregator<boolean> {
    public constructor(private collection: ICollection<T>, private condition: FilterCondition<T>) {
        super()
    }

    public aggregate(): boolean {
        const array = this.collection.toArray();

        const algo = new ExistsCustomAlgorithm<T>();

        return algo.run(array, this.condition);
    }

    // public chooseAlgorithm(array: T[]): IAlgorithm<boolean> {
    //     return new AlgorithmSolver().solve(new ExistsCustomAlgorithm(), new ExistsNativeAlgorithm(), array);
    // }
}