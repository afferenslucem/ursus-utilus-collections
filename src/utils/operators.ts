import { ICollection } from "../interfaces/i-collection";
import { Collection } from "../collection";

export function combine<T, T2>(obj: T, arr: T2[] | ICollection<T2>): Array<[T, T2]> {
    if(Array.isArray(arr)) {
        return arr.map(item => [obj, item]);
    } else {
        return arr.select<[T, T2]>(item => [obj, item]).toArray();
    }
}

export function of<T>(obj: T) : ICollection<T> {
    return new Collection<T>([obj]);
}


export function range(from: number, to: number, step = 1) : ICollection<number> {
    const result: number[] = [];

    for(let i = from; i <= to; i += step) {
        result.push(i);
    }

    return new Collection<number>(result);
}

const RANDOM_MAX = 10e10;

export function random (length: number, max = RANDOM_MAX): ICollection<number> {
    const result: number[] = [];

    for(let i = 0; i < length; i++) {
        const item = Math.floor(Math.random() * RANDOM_MAX) % max;
        result.push(item);
    }

    return new Collection<number>(result);
}

export function empty<T> (): ICollection<T> {
    return new Collection<T>([]);
}

export function repeat<T> (value: T, length: number): ICollection<T> {
    const array = new Array<T>(length).fill(value)

    return new Collection<T>(array);
}