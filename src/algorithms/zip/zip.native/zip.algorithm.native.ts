import { ZipAlgorthm } from "../zip.algorithm";
import { ZipCondition } from "../../../commands/delegates";

export class ZipNativeAlgorithm<T1, T2, TResult> extends ZipAlgorthm<T1, T2, TResult> {
    public run<V>(array: T1[], zipper: T2[], zip: ZipCondition<T1, T2, TResult>): Array<TResult> {
        if (array.length < zipper.length) {
            return array.map((item, index) => zip(item, zipper[index]));
        } else {
            return zipper.map((item, index) => zip(array[index], item));
        }
    }
}