import { ZipAlgorthm } from "../zip.algorithm";

export class ZipNativeAlgorithm<T, V> extends ZipAlgorthm<T, V> {
    public run<V>(array: T[], zipper: V[]): Array<[T, V]> {
        if (array.length < zipper.length) {
            return array.map((item, index) => [item, zipper[index]]);
        } else {
            return zipper.map((item, index) => [array[index], item]);
        }
    }
}