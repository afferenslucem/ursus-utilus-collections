import Benchmark from "benchmark";
import _ from './src/index';

// @ts-ignore
let array: number[] = null;

function getArray(count: number) {
    const array = [];

    for(let i = 0; i < count; i++) {
        array.push(i);
    }

    return array;
}

function getArrayDesc(count: number) {
    const array = [];

    for(let i = count; i >= 0; i--) {
        array.push(i);
    }

    return array;
}

function onCycle(event: Benchmark.Event) {console.log(String(event.target))}

function suite(name: string, count = 1000000): Benchmark.Suite {
    return new Benchmark.Suite('Filter for 1000000', {
        onCycle: onCycle,   
        onStart: function () {
            array = getArray(count);
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

suite('Filter for 1000000')
    .add('Where', function () {
        return _(array).where(item => (item % 2) == 0)
        .toArray();
    })
    .add('Native filter', function () {
        return array.filter(item => (item % 2) == 0);
    })
    .add('Double where', function () {
        return _(array).where(item => (item % 2) == 0)
        .where(item => (item % 3) == 0)
        .toArray();
    })
    .add('Double native filter', function () {
        return array.filter(item => (item % 2) == 0)
        .filter(item => (item % 3) == 0);
    })
    .add('10 where', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .toArray();
    })
    .add('10 native filter', function () {
        return array
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
    })
    .run({
        async: false
    });

suite('Filter for 1000', 1000)
    .add('Where', function () {
        return _(array).where(item => (item % 2) == 0)
        .toArray();
    })
    .add('Native filter', function () {
        return array.filter(item => (item % 2) == 0);
    })
    .add('Double where', function () {
        return _(array).where(item => (item % 2) == 0)
        .where(item => (item % 3) == 0)
        .toArray();
    })
    .add('Double native filter', function () {
        return array.filter(item => (item % 2) == 0)
        .filter(item => (item % 3) == 0);
    })
    .add('10 where', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .toArray();
    })
    .add('10 native filter', function () {
        return array
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
    })
    .run({
        async: false
    });

suite('Select for 1000000')
    .add('Select', function () {
        return _(array)
        .select(item => item + 1)
        .toArray();
    })
    .add('Native map', function () {
        return array.map(item => item + 1)
    })
    .add('Double select', function () {
        return _(array)
        .select(item => item + 1)
        .select(item => item + 1)
        .toArray();
    })
    .add('Double native map', function () {
        return array
        .map(item => item + 1)
        .map(item => item + 1);
    })
    .add('10 select', function () {
        return _(array)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .toArray();
    })
    .add('10 native map', function () {
        return array
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
    })
    .run({
        async: false
    });

suite('Select for 1000', 1000)
    .add('Select', function () {
        return _(array)
        .select(item => item + 1)
        .toArray();
    })
    .add('Native map', function () {
        return array.map(item => item + 1)
    })
    .add('Double select', function () {
        return _(array)
        .select(item => item + 1)
        .select(item => item + 1)
        .toArray();
    })
    .add('Double native map', function () {
        return array
        .map(item => item + 1)
        .map(item => item + 1);
    })
    .add('10 select', function () {
        return _(array)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .toArray();
    })
    .add('10 native map', function () {
        return array
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
    })
    .run({
        async: false
    });


suite('Sort for 1000000', 1000000)
    .add('Sort', function () {
        return _(array)
        .sort()
        .toArray();
    })
    .add('Native sort', function () {
        return array.sort()
    })
    .add('SortBy', function () {
        return _(array)
        .sortBy(item => item.toString())
        .toArray();
    })
    .add('Sort after map', function () {
        return array
        .map(item => item.toString())
        .sort();
    })
    .run({
        async: false
    });



suite('Sort for 1000', 1000)
    .add('Sort', function () {
        return _(array)
        .sort()
        .toArray();
    })
    .add('Native sort', function () {
        return array.sort()
    })
    .add('SortBy', function () {
        return _(array)
        .sortBy(item => item.toString())
        .toArray();
    })
    .add('Sort after map', function () {
        return array
        .map(item => item.toString())
        .sort();
    })
    .run({
        async: false
    });