import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('PrependCollection')
    .add('declarray.prepend', () => {
        return _(array).prepend(1).toArray();
    })
    .add('lodash.push', () => {
        return Array.from(lodash(array).push(1).value());
    })
}

bench_describe('Prepend Collection', function () {  
    b_chain(bench)
})