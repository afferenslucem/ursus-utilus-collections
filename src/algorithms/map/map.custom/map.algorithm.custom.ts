import { MapAlgorthm } from "../map.algorithm";
import { MapCondition } from "../../../commands/delegates";

export class MapCustomAlgorithm<T, V> extends MapAlgorthm<T, V> {
    public run<V>(array: T[], map: MapCondition<T, V>): V[] {
        const result: V[] = [];

        for(let i = 0; i < array.length; i++) {
            result.push(map(array[i]));
        }

        return result;
    }
}