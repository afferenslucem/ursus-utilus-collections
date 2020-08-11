import Benchmark from "benchmark";
import _ from './src/index';
import lodash from 'lodash';

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

function getArrayForGrouping(count: number, disp: number) {
    const array = [];

    for(let i = 0; i < count; i++) {
        array.push([i % disp, i]);
    }

    return array;
}

function onCycle(event: Benchmark.Event) {console.log(String(event.target))}

function suite(name: string, count = 1000000, arr?: any[]): Benchmark.Suite {
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

suite('Filter for 1000000')
    .add('Where', function () {
        return _(array).where(item => (item % 2) == 0)
        .toArray();
    })
    .add('Lodash filter', function () {
        return lodash(array).filter(item => (item % 2) == 0).value();
    })
    .add('Native filter', function () {
        return array.filter(item => (item % 2) == 0);
    })
    .add('Double where', function () {
        return _(array).where(item => (item % 2) == 0)
        .where(item => (item % 3) == 0)
        .toArray();
    })
    .add('Double lodash filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .value();
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
    .add('10 lodash filter', function () {
        return lodash(array)
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
        .value()
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
    .add('Lodash filter', function () {
        return lodash(array).filter(item => (item % 2) == 0).value();
    })
    .add('Native filter', function () {
        return array.filter(item => (item % 2) == 0);
    })
    .add('Double where', function () {
        return _(array).where(item => (item % 2) == 0)
        .where(item => (item % 3) == 0)
        .toArray();
    })
    .add('Double lodash filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .value();
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
    .add('10 lodash filter', function () {
        return lodash(array)
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
        .value()
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

suite('Filter for 10', 10)
    .add('Where', function () {
        return _(array).where(item => (item % 2) == 0)
        .toArray();
    })
    .add('Lodash filter', function () {
        return lodash(array).filter(item => (item % 2) == 0).value();
    })
    .add('Native filter', function () {
        return array.filter(item => (item % 2) == 0);
    })
    .add('Double where', function () {
        return _(array).where(item => (item % 2) == 0)
        .where(item => (item % 3) == 0)
        .toArray();
    })
    .add('Double lodash filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .value();
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
    .add('10 lodash filter', function () {
        return lodash(array)
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
        .value()
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

suite('Select for 10', 10)
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

let sortingArray = null;

const sortOpt: Benchmark.Options = {
    onStart: () => sortingArray = Array.from(array)
}

suite('Sort for 1000000', 0, getArrayDesc(1000000))
    .add('Sort', function () {
        return _(array)
        .sort()
        .toArray();
    }, sortOpt)
    .add('Native sort', function () {
        return array.sort()
    }, sortOpt)
    .add('SortBy', function () {
        return _(array)
        .sortBy(item => item.toString())
        .toArray();
    }, sortOpt)
    .add('Sort after map', function () {
        return array
        .map(item => item.toString())
        .sort();
    }, sortOpt)
    .run({
        async: false
    });



suite('Sort for 1000', 0, getArrayDesc(1000))
    .add('Sort', function () {
        return _(array)
        .sort()
        .toArray();
    }, sortOpt)
    .add('Native sort', function () {
        return array.sort()
    }, sortOpt)
    .add('SortBy', function () {
        return _(array)
        .sortBy(item => item.toString())
        .toArray();
    }, sortOpt)
    .add('Sort after map', function () {
        return array
        .map(item => item.toString())
        .sort();
    }, sortOpt)
    .run({
        async: false
    });

    suite('Sort for 10', 0, getArrayDesc(10))
    .add('Sort', function () {
        return _(array)
        .sort()
        .toArray();
    }, sortOpt)
    .add('Native sort', function () {
        return array.sort()
    }, sortOpt)
    .add('SortBy', function () {
        return _(array)
        .sortBy(item => item.toString())
        .toArray();
    }, sortOpt)
    .add('Sort after map', function () {
        return array
        .map(item => item.toString())
        .sort();
    }, sortOpt)
    .run({
        async: false
    });

suite('Group for 1000000 with desp 25', 0, getArrayForGrouping(1000000, 25))
    .add('GroupBy', function () {
        return _(array as any[])
        .groupBy(item => item[0])
        .toArray();
    })
    .add('GroupBy with map', function () {
        return _(array as any[])
        .groupBy(item => item[0], group => group.first())
        .toArray();
    })
    .run({
        async: false
    });

suite('Group for 1000 with desp 15', 0, getArrayForGrouping(1000, 15))
    .add('GroupBy', function () {
        return _(array as any[])
        .groupBy(item => item[0])
        .toArray();
    })
    .add('GroupBy with map', function () {
        return _(array as any[])
        .groupBy(item => item[0], group => group.first())
        .toArray();
    })
    .run({
        async: false
    });

suite('Group for 10 with desp 3', 0, getArrayForGrouping(10, 3))
    .add('GroupBy', function () {
        return _(array as any[])
        .groupBy(item => item[0])
        .toArray();
    }, sortOpt)
    .add('GroupBy with map', function () {
        return _(array as any[])
        .groupBy(item => item[0], group => group.first())
        .toArray();
    }, sortOpt)
    .run({
        async: false
    });