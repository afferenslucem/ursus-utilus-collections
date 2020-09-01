import {getSuite, bit, b_chain } from "../../../bench/common/suite";
import _ from "../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const exists = (item: number) => item > 100

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.any', () => {
        _(array).exists(exists);
    })
    .add('lodash.some', () => {
        lodash(array).some(exists);
    })
    .add('array.some', () => {
        array.some(exists)
    })
}

describe('Any Algorithm', function () {  
    b_chain(bench)
})