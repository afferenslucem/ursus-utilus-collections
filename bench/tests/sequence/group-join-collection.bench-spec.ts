import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('GroupJoinCollection')
    .add('declarray.group', () => {
        return _(array).groupJoin(second, item => item, item => item * 2, (a, bs) => ({a, bs})).toArray();
    })
}

bench_describe('GroupJoin Collection', function () {  
    b_chain(bench)
})