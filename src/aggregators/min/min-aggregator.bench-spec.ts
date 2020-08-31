import {getSuite, bit, b_chain } from "../../../bench/common/suite";
import _ from "../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const min = (a: number, b: number) => Math.min(a, b)

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.min', () => {
        _(array).min();
    })
    .add('lodash.min', () => {
        lodash(array).min();
    })
    .add('array.reduce', () => {
        array.reduce(min)
    })
}

describe('Min Algorithm', function () {  
    b_chain(bench)
})