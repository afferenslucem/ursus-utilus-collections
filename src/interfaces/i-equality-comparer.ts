export interface IEqualityComparer<T> {
    getHashCode(object: T) : string;
    equal(first: T, seconds: T) : boolean;
}