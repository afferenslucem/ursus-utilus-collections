import { DictionaryException } from "../exceptions/dictionary-exceptions";
import { IEqualityComparer } from "../interfaces/i-equality-comparer";
import { Dictionary } from "./distionary";

export class HashSet<T> {
    private storage: Dictionary<T, T>;

    public constructor(comparer?: IEqualityComparer<T>) {
        this.storage = new Dictionary<T, T>(comparer);
    }

    public add(item: T): void {
        this.storage.addIfNotExists(item, item);
    }
    
    public remove(item: T): void {
        this.storage.remove(item);
    }

    public entries(): Array<T> {
        return this.storage.entries().map(item => item[0]);
    }

    public has(item: T): boolean {
        return this.storage.has(item);
    }
}