import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function skipBench(array: number[]): Suite {
    return getSuite('SkippingCollection')
    .add('declarray.skip', () => {
        return _(array).skip(array.length / 10).toArray();
    })
    .add('lodash.drop', () => {
        return lodash(array).drop(array.length / 10).value()
    })
    .add('array.slice', () => {
        return array.slice(array.length / 10);
    })
}

bench_describe('Skip Collection', function () {  
    b_chain(skipBench)
})

function skipRightBench(array: number[]): Suite {
    return getSuite('SkippingLastCollection')
    .add('declarray.skipLast', () => {
        return _(array).skipLast(array.length / 10).toArray();
    })
    .add('lodash.dropRight', () => {
        return lodash(array).dropRight(array.length / 10).value()
    })
    .add('array.slice', () => {
        return array.slice(0, array.length - array.length / 10);
    })
}

bench_describe('SkipLast Collection', function () {  
    b_chain(skipRightBench)
})

function skipWhileBench(array: number[]): Suite {
    return getSuite('SkippingWhileCollection')
    .add('declarray.skipWhile', () => {
        return _(array).skipWhile(item => item < 25).toArray();
    })
    .add('lodash.dropWhile', () => {
        return lodash(array).dropWhile(item => item < 25).value()
    })
}

bench_describe('SkipWhile Collection', function () {  
    b_chain(skipWhileBench)
})