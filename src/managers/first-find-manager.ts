import { FilterCondition } from "../commands/delegates";
import { Collection } from "../collections/collection";
import { Exception } from "../exceptions/exceptions";
import { IIteratorData } from "../interfaces/i-iterator-data";

export class FirstFindManager<T> {
    public constructor(private collection: Collection<T>) {}

    public first(predicate?: FilterCondition<T> | undefined): T {
        const result = this.findFirst(predicate);

        if (result.done) {
            throw Exception.NoMatches;
        } else {
            // @ts-ignore
            return result.value;
        }
    }

    public firstOrDefault(predicate?: FilterCondition<T> | undefined, $default?: T | null | undefined): T | null {
        const result = this.findFirst(predicate);

        if (result.done) {
            return $default !== undefined ? $default : null;
        } else {
            // @ts-ignore
            return result.value;
        }
    }

    private findFirst(predicate?: FilterCondition<T> | undefined): IIteratorData<T> {
        return predicate ? 
        this.collection.where(predicate).getIterator().next() :
        this.collection.getIterator().next();
    }
}