import { IEqualityComparer } from "../interfaces/i-equality-comparer";
import { Dictionary } from "./distionary";

export class HashSet<T> {
    private storage: Dictionary<T, T>;

    public constructor(comparer?: IEqualityComparer<T>) {
        this.storage = new Dictionary<T, T>(comparer);
    }

    /**
     * Adds element to set if not exists
     * @param item Item for add
     */
    public add(item: T): void {
        this.storage.addIfNotExists(item, item);
    }
        
    /**
     * Removes element from set
     * @param item Item for remove
     */
    public remove(item: T): void {
        try {
            this.storage.remove(item);
        } catch {

        }
    }

    /**
     * Returns array with elements
     */
    public entries(): Array<T> {
        return this.storage.entries().map(item => item[0]);
    }

    /**
     * Check existing of element
     * @param item Item for check
     */
    public contains(item: T): boolean {
        return this.storage.contains(item);
    }

    /**
     * Removes all elements
     */
    public clear(): void {
        this.storage.clear();
    }
        
    /**
     * Returns count of elements
     */
    public get count(): number {
        return this.storage.count;
    }
}