import Benchmark from "benchmark";

// @ts-ignore
export let array: number[] = null;

function getArray(count: number) {
    const array = [];

    for(let i = 0; i < count; i++) {
        array.push(i);
    }

    return array;
}

export function getArrayDesc(count: number) {
    const array = [];

    for(let i = count; i >= 0; i--) {
        array.push(i);
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

function onCycle(event: Benchmark.Event) {console.log(String(event.target))}

export function suite(name: string, count = 1000000, arr?: any[]): Benchmark.Suite {
    return new Benchmark.Suite('Filter for 1000000', {
        onCycle: onCycle,
        onStart: function () {
            array = arr != null ? arr : getArray(count);
            console.log(`${name}:`)
        },
        onComplete: function() {
            console.log();
        },
        onError: function() {
            console.warn(...arguments)
        }
    })
}
