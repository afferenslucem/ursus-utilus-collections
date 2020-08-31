import {getSuite, bit, b_chain } from "../../../../bench/common/suite";
import _ from "../../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const condition = (item: number) => item - 1;

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.select', () => {
        _(array).select(condition).toArray();
    })
    .add('lodash.map', () => {
        lodash(array).map(condition).value();
    })
    .add('array.map', () => {
        array.map(condition);
    });
}

describe('Mapping Algorithm', function () {  
    b_chain(bench)
})