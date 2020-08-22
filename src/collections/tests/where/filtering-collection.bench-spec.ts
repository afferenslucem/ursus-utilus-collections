import {getSuite, bit, b_chain } from "../../../../bench/common/suite";
import _ from "../../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const condition = (item: number) => (item % 10) == 0;

function bench(array: number[]): Suite {
    return getSuite('name')
    .add('ursus.where', () => {
        _(array).where(condition).toArray();
    })
    .add('lodash.filter', () => {
        lodash(array).filter(condition).value();
    })
    .add('array.filter', () => {
        array.filter(condition);
    });
}

describe('Filtering Algorithm', function () {    
    b_chain(bench)
})