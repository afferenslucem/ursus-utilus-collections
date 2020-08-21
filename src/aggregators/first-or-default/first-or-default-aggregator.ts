import { FirstAggregator } from "../first/first-aggregator";
import { ICollection } from "../..";
import { FilterCondition } from "../../commands/delegates";
import { Exception } from "../../exceptions/exceptions";

export class FirstOrDefaultAggregator<T> extends FirstAggregator<T> {
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