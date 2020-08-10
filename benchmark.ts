import Benchmark from "benchmark";
import _ from './src/index';

const suite = new Benchmark.Suite('Filter', {
    onCycle: (event: Benchmark.Event) => console.log(String(event.target))
});

// @ts-ignore
let array: number[] = null;

function getArrayForFilter(count: number = 1000000) {
    const array = [];

    for(let i = 0; i < count; i++) {
        array.push(i);
    }

    return array;
}

suite
.add('Where for 1000000 els', function () {
    return _(array).where(item => (item % 2) == 0)
    .toArray();
}, {
    onStart: function () {
        array = getArrayForFilter();
    }
})
.add('Native filter 1000000 els', function () {
    return array.filter(item => (item % 2) == 0);
}, {
    onStart: function () {
        array = getArrayForFilter();
    }
})
.add('Double where 1000000 els', function () {
    return _(array).where(item => (item % 2) == 0)
    .where(item => (item % 3) == 0)
    .toArray();
}, {
    onStart: function () {
        array = getArrayForFilter();
    }
})
.add('Double native filter 1000000 els', function () {
    return array.filter(item => (item % 2) == 0)
    .filter(item => (item % 3) == 0);
}, {
    onStart: function () {
        array = getArrayForFilter();
    }
});

suite.run({
    async: false
});