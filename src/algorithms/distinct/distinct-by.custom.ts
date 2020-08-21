import { IAlgorithm } from "../i-algorithm";
import { DistinctByAlgorthm } from "./distinct-by";
import { MapCondition } from "../../commands/delegates";

export class DistinctByCustomAlgorithm<T> extends DistinctByAlgorthm<T> {
    public run<V>(array: T[], map: MapCondition<T, V>): T[] {
        const storage = new Map<V, T>();

        for(let i = 0, len = array.length; i < len; i++) {
            const key = map(array[i]);

            if(storage.has(key)) continue;

            storage.set(key, array[i])
        }

        return Array.from(storage.values());
    }
}