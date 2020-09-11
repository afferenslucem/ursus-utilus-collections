import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const zipper = _.random(array.length, 100).toArray();

    return getSuite('ZipCollection')
    .add('declarray.zip', () => {
        return _(array).zip(zipper).toArray();
    })
    .add('lodash.zip', () => {
        return lodash(array).zip(zipper).value();
    })
    .add('array.map', () => {
        return array.map((item, index) => [item, zipper[index]]);
    });
}

bench_describe('Zipping Algorithm', function () {    
    b_chain(bench)
})