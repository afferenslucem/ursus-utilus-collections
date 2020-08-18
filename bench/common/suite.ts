import Benchmark, { Suite } from "benchmark";
import { Function } from "lodash";

// @ts-ignore
export let array: number[] = null;

export function getArray(count: number) {
    const array = [];

    for(let i = 0; i < count; i++) {
        const item = (Math.random() * Math.pow(count, 2)) % count + 1
        array.push(item);
    }

    return array;
}

export function getArrayForGrouping(count: number, disp: number) {
    const array = [];

    for(let i = 0; i < count; i++) {
        array.push([i % disp, i]);
    }

    return array;
}

export function onCycle(event: Benchmark.Event) {console.log(String(event.target))}

export function addEmptyLines(count: number = 1) {
    for(let i = 0; i < count; i++) {
        console.log();
    }
}

export const split = {
    onStart: () => addEmptyLines(1)
}

export function addSplit() {
    console.log('----------------------------------------------------')
}

export function suite(name: string, count = 1000000, arr?: any[]): Benchmark.Suite {
    return new Benchmark.Suite(name, {
        onCycle: onCycle,
        onStart: function () {
            array = arr != null ? arr : getArray(count);
            addSplit();
            console.log(`${name}:`)
        },
        onComplete: function() {
        },
        onError: function() {
            console.warn(...arguments)
        }
    })
}