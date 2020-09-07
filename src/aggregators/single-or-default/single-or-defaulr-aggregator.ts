import { ICollection } from "../..";
import { Exception } from "../../exceptions/exceptions";
import { SingleAggregator } from "../single/single-aggregator";


export class SingleOrDefaultAggregator<T> extends SingleAggregator<T> {
    public constructor(collection: ICollection<T>, private $default: T | null = null) {
        super(collection)
    }

    public aggregate(): T {
        try {
            return super.aggregate()
        } catch (e) {
            if (e == Exception.NoMatches) {
                // @ts-ignore
                return this.$default;
            } else {
                throw e;
            }
        }
    }
}