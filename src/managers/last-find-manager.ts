import { FilterCondition } from "../commands/delegates";
import { Collection } from "../collections/collection";
import { Exception } from "../exceptions/exceptions";
import { IIteratorData } from "../interfaces/i-iterator-data";
import { IIterator } from "../interfaces/i-iterator";
import { LAST_ITERATOR_ITEM } from "../iterators/last-iterator-item";

export class LastFindManager<T> {
    public constructor(private collection: Collection<T>) {}

    public last(predicate?: FilterCondition<T> | undefined): T {
        const result = this.findLast(predicate);

        if (result.done) {
            throw Exception.NoMatches;
        } else {
            // @ts-ignore
            return result.value;
        }
    }

    public lastOrDefault(predicate?: FilterCondition<T> | undefined, $default?: T | null | undefined): T | null {
        const result = this.findLast(predicate);

        if (result.done) {
            return $default !== undefined ? $default : null;
        } else {
            // @ts-ignore
            return result.value;
        }
    }

    private findLast(predicate?: FilterCondition<T> | undefined): IIteratorData<T> {
        const iterator = this.getIterator(predicate);

        let prev = LAST_ITERATOR_ITEM;
        let current = LAST_ITERATOR_ITEM;

        do {
            prev = current;
            current = iterator.next();
        } while (!current.done);

        return prev;
    }

    private getIterator(predicate?: FilterCondition<T> | undefined): IIterator<T> {
        return predicate ? 
        this.collection.where(predicate).getIterator() :
        this.collection.getIterator();
    }
}