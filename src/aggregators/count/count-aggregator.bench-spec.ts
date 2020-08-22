import {getSuite, bit, b_chain } from "../../../bench/common/suite";
import _ from "../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const count = (item: number) => item > 100

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.count', () => {
        _(array).count(count);
    })
    .add('lodash.countBy', () => {
        lodash(array).countBy(count).value();
    })
}

describe('Count Algorithm', function () {  
    b_chain(bench)
})