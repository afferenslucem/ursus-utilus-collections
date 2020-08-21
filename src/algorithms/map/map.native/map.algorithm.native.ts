import { MapAlgorthm } from "../map.algorithm";
import { MapCondition } from "../../../commands/delegates";

export class MapNativeAlgorithm<T, V> extends MapAlgorthm<T, V> {
    public run<V>(array: T[], map: MapCondition<T, V>): V[] {
        return array.map(map);
    }
}