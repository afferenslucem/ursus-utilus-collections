import { IEqualityComparer } from "../interfaces/i-equality-comparer";

export abstract class AbstractEqualityComparer<T> implements IEqualityComparer<T> {
    public abstract getHashCode(object: T) : string;
    public abstract equal(first: T, seconds: T) : boolean;
}

export class DefaultEqualityComparer<T> extends AbstractEqualityComparer<T> {
    public getHashCode(object: T): string {
        // @ts-ignore
        return object;
    }
    public equal(first: T, seconds: T): boolean {
        return first === seconds;
    }
}