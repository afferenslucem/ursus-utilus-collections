import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('GroupingCollection')
    .add('declarray.group', () => {
        return _(array).groupBy(item => item).toArray();
    })
    .add('lodash.group', () => {
        return lodash(array).groupBy(item => item).value();
    })
}

bench_describe('Grouping Collection', function () {  
    b_chain(bench)
})