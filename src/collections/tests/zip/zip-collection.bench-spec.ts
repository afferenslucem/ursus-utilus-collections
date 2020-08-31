import {getSuite, bit, b_chain } from "../../../../bench/common/suite";
import _ from "../../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const zipper = _.random(array.length, 100).toArray();

    return getSuite('name')
    .add('ursus.zip', () => {
        return _(array).zip(zipper).toArray();
    })
    .add('lodash.zip', () => {
        return lodash(array).zip(zipper).value();
    })
    .add('array.map', () => {
        return array.map((item, index) => [item, zipper[index]]);
    });
}

describe('Zipping Algorithm', function () {    
    b_chain(bench)
})