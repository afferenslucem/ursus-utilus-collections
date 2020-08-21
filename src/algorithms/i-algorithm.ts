export interface IAlgorithm<T> {
    run(...arg: any[]): T;
}