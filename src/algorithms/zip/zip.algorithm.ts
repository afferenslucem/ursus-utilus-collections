import { IAlgorithm } from "../i-algorithm";

export abstract class ZipAlgorthm<T, V> implements IAlgorithm<Array<[T, V]>> {
    public abstract run<V>(array: T[], zipper: V[]): Array<[T, V]>;
}