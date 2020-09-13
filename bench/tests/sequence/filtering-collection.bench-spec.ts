import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const condition = (item: number) => (item % 10) == 0;

function bench(array: number[]): Suite {
    return getSuite('FilteringCollection')
    .add('declarray.where', () => {
        return _(array).where(condition).toArray();
    })
    .add('lodash.filter', () => {
        return lodash(array).filter(condition).value();
    })
    .add('array.filter', () => {
        return array.filter(condition);
    });
}

bench_describe('Filtering Algorithm', function () {    
    b_chain(bench)
})