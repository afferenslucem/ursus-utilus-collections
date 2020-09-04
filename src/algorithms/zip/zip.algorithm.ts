import { IAlgorithm } from "../i-algorithm";
import { ZipCondition } from "../../commands/delegates";

export abstract class ZipAlgorthm<T1, T2, TResult> implements IAlgorithm<Array<TResult>> {
    public abstract run(array: T1[], zipper: T2[], zip: ZipCondition<T1, T2, TResult>): Array<TResult>;
}