import { IAlgorithm } from "../i-algorithm";
import { DistinctByAlgorthm } from "./distinct-by";
import { MapCondition } from "../../commands/delegates";

export class DistinctByNativeAlgorithm<T> extends DistinctByAlgorthm<T> {
    public run<V>(array: T[], map: MapCondition<T, V>): T[] {
        const storage = new Map<V, T>();
        return Array.from(array.reduce((store, item) => {
            
            const key = map(item);

            if(store.has(key)) return store;

            store.set(key, item);

            return store
        }, storage).values());
    }
}