import { ICollection } from "../interfaces/i-collection";

export abstract class Aggregator<T> {
    public abstract aggregate(collection: ICollection<T>): T;
}