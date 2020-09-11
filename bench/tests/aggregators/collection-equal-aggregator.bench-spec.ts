import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const copy = Array.from(array);

    return getSuite('CollectionEqualAggregator')
    .add('declarray.collectionEqual for equal', () => {
        return _(array).collectionEqual(copy);
    })
    .add('lodash.some for equal', () => {
        return lodash(array).isEqual(copy);
    })
    .add('array.some for equal', () => {
        return array.every((item, index) => item === copy[index])
    });
}

bench_describe('Collection equals', function () {  
    b_chain(bench)
})