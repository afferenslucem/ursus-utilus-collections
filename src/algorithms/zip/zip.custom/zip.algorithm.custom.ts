import { ZipAlgorthm } from "../zip.algorithm";

export class ZipCustomAlgorithm<T, V> extends ZipAlgorthm<T, V> {
    public run<V>(array: T[], zipper: V[]): Array<[T, V]> {
        const min = Math.min(array.length, zipper.length);

        const result = new Array(min);

        for(let i = 0; i < min; i++) {
            result[i] = [array[i], zipper[i]];
        }

        return result;
    }
}