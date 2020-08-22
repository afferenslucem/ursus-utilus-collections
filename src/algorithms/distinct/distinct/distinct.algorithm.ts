import { IAlgorithm } from "../../i-algorithm";

export class DistinctAlgorithm<T> implements IAlgorithm<T[]> {
    public run(array: T[]): T[] {
        return Array.from(new Set(array));
    }
}