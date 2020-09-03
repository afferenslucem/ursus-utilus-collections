import {getSuite, bit, b_chain } from "../../../bench/common/suite";
import _ from "../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const exists = (item: number) => item > 0

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.all', () => {
        _(array).all(exists);
    })
    .add('lodash.every', () => {
        lodash(array).every(exists);
    })
    .add('array.every', () => {
        array.every(exists)
    })
}

describe('Any Algorithm', function () {  
    b_chain(bench)
})