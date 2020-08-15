import _, { ICollection } from '../src/index';
import lodash from 'lodash';
import { array, suite, split, onCycle, getArray, addSplit } from "./common/suite";
import Benchmark from 'benchmark';

function returnArray(arr: any[]): { get(): any[] } {
    return {
        get(): any[] {
            return arr;
        }
    }
}

let collection: ICollection<number>;
let itArr: number[]

function iteratingSuite(name: string, count: number): Benchmark.Suite {
    return new Benchmark.Suite(name, {
        onCycle: onCycle,
        onStart: function () {
            itArr = getArray(count);
            collection = _(itArr);
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

function addToCreationSuite(suite: Benchmark.Suite) {
    suite
    .add('Create Collecion', function () {
        return _(array);
    }, split)
    .add('Create Lodash', function () {
        return lodash(array);
    })
}

function addToReturningSuite(suite: Benchmark.Suite) {
    suite
    .add('Return Array', function () {
        return _(array).toArray();
    }, split)
    .add('Return Lodash Array', function () {
        return lodash(array).value();;
    })
    .add('Native Return Array', function () {
        return returnArray(array).get();
    })
}

function addToIteratingSuite(suite: Benchmark.Suite) {
    suite
    .add('Iterate Where Collection', function () {
        // @ts-ignore
        return collection.where(item => !!item).materialize();
    }, split)
    .add('Iterate Filter Lodash', function () {
        return lodash(itArr).filter(item => !!item).value();;
    })
    .add('Iterate Filter Native', function () {
        return returnArray(itArr).get().filter(item => !!item);
    })
}

/* Creation */

const creation_1000000 = suite('Creation', 1000000);
addToCreationSuite(creation_1000000);

creation_1000000.run();

/* Returning */

const returning_1000000 = suite('Returning', 1000000);
addToReturningSuite(returning_1000000);

returning_1000000.run();

/* Iterating */

const iterating_1000000 = iteratingSuite('Iterating 1000000', 1000000);
addToIteratingSuite(iterating_1000000);

const iterating_10000 = iteratingSuite('Iterating 10000', 10000);
addToIteratingSuite(iterating_10000);

const iterating_100 = iteratingSuite('Iterating 100', 100);
addToIteratingSuite(iterating_100);

const iterating_1 = iteratingSuite('Iterating 1', 1);
addToIteratingSuite(iterating_1);


iterating_1000000.run();
iterating_10000.run();
iterating_100.run();
iterating_1.run();