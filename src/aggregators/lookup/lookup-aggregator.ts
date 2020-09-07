import { Aggregator } from "../aggregator";
import { ICollection } from "../..";
import { MapCondition } from "../../commands/delegates";

export class LookupAggregator<T, TKey, TValue = T> extends Aggregator<Map<TKey, TValue[]>> {
    public constructor(private collection: ICollection<T>, private keySelector: MapCondition<T, TKey>, private valueSelector?: MapCondition<T, TValue>){
        super();
    }

    public aggregate(): Map<TKey, TValue[]> {
        const grouped = this.valueSelector != null ? 
            // @ts-ignore
            this.collection.groupBy(this.keySelector, group => group.select(this.valueSelector).toArray()) :
            this.collection.groupBy(this.keySelector, group => group.toArray());
        
        const materialized = grouped.toArray();

        const result = new Map<TKey, TValue[] | T[]>();

        for(let i = 0, len = materialized.length; i < len; i++) {
            result.set(materialized[i].key, materialized[i].group)
        }

        // @ts-ignore
        return result;
    }
}