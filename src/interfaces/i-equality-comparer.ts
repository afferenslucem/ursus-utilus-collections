export interface IEqualityComparer<T> {
    getHashCode(object: T) : string | number;
    equal(first: T, seconds: T) : boolean;
}