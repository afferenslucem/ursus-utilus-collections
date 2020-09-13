import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const condition = (item: number) => item - 1;

function bench(array: number[]): Suite {
    return getSuite('MappingCollection')
    .add('declarray.select', () => {
        return _(array).select(condition).toArray();
    })
    .add('lodash.map', () => {
        return lodash(array).map(condition).value();
    })
    .add('array.map', () => {
        return array.map(condition);
    });
}

bench_describe('Select Algorithm', function () {  
    b_chain(bench)
})