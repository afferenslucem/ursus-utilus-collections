import { ICollection } from "../interfaces/i-collection";
import { FilterCondition } from "../commands/delegates";
import { FirstAggregator } from "./first-aggregator";
import { Exception } from "../exceptions/exceptions";
import { LastAggregator } from "./last-aggregtor";

export class LastOrDefaultAggregator<T> extends LastAggregator<T> {
    public constructor(collection: ICollection<T>, predicate?: FilterCondition<T> | undefined, private $default?: T | null | undefined){
        super(collection, predicate);
    }

    // @ts-ignore
    public aggregate(): T | null {
        try {
            return super.aggregate();
        }
        catch(e) {
            if (e == Exception.NoMatches) {
                return this.$default !== undefined ? this.$default : null;
            } else {
                throw e;
            }            
        }
    }
}