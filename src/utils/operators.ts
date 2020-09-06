import { ICollection } from "../interfaces/i-collection";

export function combine<T, T2>(obj: T, arr: T2[] | ICollection<T2>): Array<[T, T2]> {
    if(Array.isArray(arr)) {
        return arr.map(item => [obj, item]);
    } else {
        return arr.select<[T, T2]>(item => [obj, item]).toArray();
    }
}