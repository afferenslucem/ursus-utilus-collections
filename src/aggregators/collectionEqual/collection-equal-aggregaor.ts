import { ICollection } from "../..";
import { Aggregator } from "../aggregator";
import { Exception } from "../../exceptions/exceptions";
import { EqualityCondition } from "../../commands/delegates";
import { equalityCompare } from "../../utils/equality-compare";
import { first } from "lodash";


export class CollectionEqualAggregator<T> extends Aggregator<boolean> {
    public constructor(private first: ICollection<T>, private second: ICollection<T>, private comparer: EqualityCondition<T> = equalityCompare) {
        super()
    }

    public aggregate(): boolean {
        const len1 = this.first.count();
        const len2 = this.second.count();

        if (len1 !== len2) return false;

        const arr1 = this.first.toArray();
        const arr2 = this.second.toArray();

        for(let i = 0; i < len2; i++) {
            if(!this.comparer(arr1[i], arr2[i])) {
                return false;
            }
        }

        return true;
    }
}