import {getSuite, bit, b_chain } from "../../../bench/common/suite";
import _ from "../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const sum = (a: number, b: number) => a + b

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.aggregate', () => {
        _(array).aggregate(sum);
    })
    .add('lodash.reduce', () => {
        lodash(array).reduce(sum);
    })
    .add('array.reduce', () => {
        array.reduce(sum)
    })
}

describe('Reduce Algorithm', function () {      
    b_chain(bench)
})