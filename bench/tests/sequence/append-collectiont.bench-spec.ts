import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('ApependCollection')
    .add('declarray.append', () => {
        return _(array).append(1).toArray();
    })
    .add('lodash.push', () => {
        return lodash(array).push(1).value();
    })
}

bench_describe('Append Collection', function () {  
    b_chain(bench)
})