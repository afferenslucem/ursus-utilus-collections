import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('JoinCollection')
    .add('declarray.join', () => {
        return _(array).join(second, item => item, item => item * 2, (a, b) => ({a, b})).toArray();
    })
}

bench_describe('Join Collection', function () {  
    b_chain(bench)
})