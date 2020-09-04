import { ZipAlgorthm } from "../zip.algorithm";
import { ZipCondition } from "../../../commands/delegates";

export class ZipCustomAlgorithm<T1, T2, TResult> extends ZipAlgorthm<T1, T2, TResult> {
    public run(array: T1[], zipper: T2[], zip: ZipCondition<T1, T2, TResult>): Array<TResult> {
        const min = Math.min(array.length, zipper.length);

        const result = new Array<TResult>(min);

        for(let i = 0; i < min; i++) {
            result[i] = zip(array[i], zipper[i]);
        }

        return result;
    }
}