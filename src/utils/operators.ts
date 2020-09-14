import { ISequence } from "../interfaces/i-sequence";
import { Sequence } from "../sequence";

export function combine<T, T2>(obj: T, arr: T2[] | ISequence<T2>): Array<[T, T2]> {
    if(Array.isArray(arr)) {
        return arr.map(item => [obj, item]);
    } else {
        return arr.select<[T, T2]>(item => [obj, item]).toArray();
    }
}

export function of<T>(obj: T) : ISequence<T> {
    return new Sequence<T>([obj]);
}


export function range(from: number, to: number, step = 1) : ISequence<number> {
    const result: number[] = [];

    for(let i = from; i <= to; i += step) {
        result.push(i);
    }

    return new Sequence<number>(result);
}

const RANDOM_MAX = 10e10;

export function random (length: number, max = RANDOM_MAX): ISequence<number> {
    const result: number[] = [];

    for(let i = 0; i < length; i++) {
        const item = Math.floor(Math.random() * RANDOM_MAX) % max;
        result.push(item);
    }

    return new Sequence<number>(result);
}

export function empty<T> (): ISequence<T> {
    return new Sequence<T>([]);
}

export function repeat<T> (value: T, length: number): ISequence<T> {
    const array = new Array<T>(length).fill(value)

    return new Sequence<T>(array);
}