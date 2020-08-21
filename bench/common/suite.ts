import { Suite, Event } from "benchmark";
import { Func, Test } from "mocha";

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

export function bit(title: string, func: Func): Test {
    const test = it(title, func);
    test.timeout(BENCH_TIMEOUT);

    return test;
}