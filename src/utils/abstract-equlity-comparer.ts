export abstract class AbstractEqualityComparer<T> {
    public abstract getHashCode(object: T) : string;
    public abstract equal(first: T, seconds: T) : boolean;
}

export class DefaultEqualityComparer<T> extends AbstractEqualityComparer<T> {
    public getHashCode(object: T): string {
        throw new Error("Method not implemented.");
    }
    public equal(first: T, seconds: T): boolean {
        return first === seconds;
    }
}