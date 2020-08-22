import {getSuite, bit, b_chain } from "../../../../bench/common/suite";
import _ from "../../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.distinct', () => {
        _(array).distinct().toArray();
    })
    .add('lodash.uniq', () => {
        lodash(array).uniq().value();
    })
    .add('set', () => {
        Array.from(new Set(array))
    })
    .add('ursus.distinctBy', () => {
        _(array).distinct(item => item * 2).toArray();
    })
    .add('lodash.uniqBy', () => {
        lodash(array).uniqBy(item => item * 2).value();
    });
}

describe('Distinct Algorithm', function () {  
    b_chain(bench)
})