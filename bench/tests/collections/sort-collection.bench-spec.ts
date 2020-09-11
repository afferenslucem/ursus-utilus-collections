import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('SortingCollection')
    .add('declarray.sort', () => {
        return _(array).sort().toArray();
    })
    .add('lodash.sort', () => {
        return Array.from(lodash(array).sort().value());
    })
    .add('array.sort', () => {
        return Array.from(array.sort());
    })
}

bench_describe('Sort Collection', function () {  
    b_chain(bench)
})