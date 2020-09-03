import { FilterCondition } from "../../commands/delegates";
import { ICollection } from "../../interfaces/i-collection";
import { Aggregator } from "../aggregator";
import { AllCustomAlgorithm } from "../../algorithms/all/all.custom/all.algorithm.custom";

export class AllAggregator<T> extends Aggregator<boolean> {
    public constructor(private collection: ICollection<T>, private condition: FilterCondition<T>) {
        super()
    }

    public aggregate(): boolean {
        const array = this.collection.toArray();

        const algo = new AllCustomAlgorithm<T>();

        return algo.run(array, this.condition);
    }

    // public chooseAlgorithm(array: T[]): IAlgorithm<boolean> {
    //     return new AlgorithmSolver().solve(new ExistsCustomAlgorithm(), new ExistsNativeAlgorithm(), array);
    // }
}