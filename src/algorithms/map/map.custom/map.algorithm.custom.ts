import { MapAlgorthm } from "../map.algorithm";
import { ServiceMapCondition } from "../../../commands/delegates";

export class MapCustomAlgorithm<T, V> extends MapAlgorthm<T, V> {
    public run<V>(array: T[], map: ServiceMapCondition<T, V>): V[] {
        const result: V[] = [];

        for(let i = 0; i < array.length; i++) {
            result.push(map(array[i], i));
        }

        return result;
    }
}