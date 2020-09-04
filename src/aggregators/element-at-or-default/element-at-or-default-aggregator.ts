import { ICollection } from "../..";
import { Exception } from "../../exceptions/exceptions";
import { ElementAtAggregator } from "../element-at/element-at";

export class ElementAtOrDefaultAggregator<T> extends ElementAtAggregator<T> {
    public constructor(collection: ICollection<T>, position: number, private $default: T | null){
        super(collection, position);
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