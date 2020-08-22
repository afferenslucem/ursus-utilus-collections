import {getSuite, bit, b_chain } from "../../../bench/common/suite";
import _ from "../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const max = (a: number, b: number) => Math.max(a, b)

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.max', () => {
        _(array).max();
    })
    .add('lodash.max', () => {
        lodash(array).max();
    })
    .add('array.reduce', () => {
        array.reduce(max)
    })
}

describe('Max Algorithm', function () {  
    b_chain(bench)
})