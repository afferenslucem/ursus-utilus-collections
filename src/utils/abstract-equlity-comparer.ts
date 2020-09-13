export abstract class AbstractEqualityComparer<T> {
    public abstract getHashCode(object: T) : string;
    public abstract isEquals(first: T, seconds: T) : boolean;
}

export class DefaultEqqualityComparer<T> extends AbstractEqualityComparer<T> {
    public getHashCode(object: T): string {
        throw new Error("Method not implemented.");
    }
    public isEquals(first: T, seconds: T): boolean {
        return first === seconds;
    }
}