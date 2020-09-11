import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function takeBench(array: number[]): Suite {
    return getSuite('TakingCollection')
    .add('declarray.take', () => {
        return _(array).take(array.length / 10).toArray();
    })
    .add('lodash.take', () => {
        return lodash(array).drop(array.length / 10).value()
    })
    .add('array.slice', () => {
        return array.slice(0, array.length / 10);
    })
}

bench_describe('Take Collection', function () {  
    b_chain(takeBench)
})

function takeRightBench(array: number[]): Suite {
    return getSuite('TakingLastCollection')
    .add('declarray.takeLast', () => {
        return _(array).takeLast(array.length / 10).toArray();
    })
    .add('lodash.dropRight', () => {
        return lodash(array).takeRight(array.length / 10).value()
    })
    .add('array.slice', () => {
        return array.slice(array.length / 10);
    })
}

bench_describe('TakeLast Collection', function () {  
    b_chain(takeRightBench)
})

function takeWhileBench(array: number[]): Suite {
    return getSuite('TakingWhileCollection')
    .add('declarray.takeWhile', () => {
        return _(array).takeWhile(item => item < 25).toArray();
    })
    .add('lodash.takeWhile', () => {
        return lodash(array).takeWhile(item => item < 25).value()
    })
}

bench_describe('TakeWhile Collection', function () {  
    b_chain(takeWhileBench)
})