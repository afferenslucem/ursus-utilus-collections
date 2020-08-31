import { Suite, Event } from "benchmark";
import { Func, Test } from "mocha";
import _ from '../../src';

export const BENCH_TIMEOUT = '200s';

export function getSuite(name: string, onStart?: () => void, onComplite?: () => void): Suite {
    return new Suite(name, {
        onCycle: (event: Event) => console.log(String(event.target)),
        onStart: onStart,
        onComplete: onComplite,
        onError: function() {
            console.warn(...arguments)
        }
    })
}

export const values = [
    1_000_000,
    750_000,
    500_000,
    250_000,
    100_000,
    75_000,
    50_000,
    25_000,
    10_000,
    7_500,
    5_000,
    2_500,
    1_000,
    750,
    500,
    250,
    100,
];

export function b_chain(func: (array: any[]) => Suite): Test[] {
    return values.map(item => 
        bit(`${item} array`, () => {
            const array = _.random(item).select(item => item % 3).toArray();
            func(array).run();
        })
    )
}

export function bit(title: string, func: Func): Test {
    const test = it(title, func);
    test.timeout(BENCH_TIMEOUT);

    return test;
}