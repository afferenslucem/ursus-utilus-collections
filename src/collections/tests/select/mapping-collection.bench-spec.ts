import {getSuite, bit } from "../../../../bench/common/suite";
import _ from "../../../index";
import lodash from "lodash";
import { Suite } from "benchmark";

const condition = (item: number) => item - 1;

function bench(name: string, array: number[]): Suite {
    return getSuite(name)
    .add('ursus.select', () => {
        _(array).select(condition).toArray();
    })
    .add('lodash.map', () => {
        lodash(array).map(condition).value();
    })
    .add('array.map', () => {
        array.map(condition);
    });
}

describe('Mapping Algorithm', function () {  
    bit('1,000,000 array', () => {
        const array = _.random(1_000_000).toArray();

        bench('1,000,000 array', array).run();
    });

    bit('500,000 array', () => {
        const array = _.random(500_000).toArray();

        bench('500,000 array', array).run();
    });

    bit('100,000 array', () => {
        const array = _.random(100_000).toArray();

        bench('100,000 array', array).run();
    });

    bit('50,000 array', () => {
        const array = _.random(50_000).toArray();

        bench('50,000 array', array).run();
    });

    bit('10,000 array', () => {
        const array = _.random(10_000).toArray();

        bench('10,000 array', array).run();
    });

    bit('5,000 array', () => {
        const array = _.random(5_000).toArray();

        bench('5,000 array', array).run();
    });

    bit('1,000 array', () => {
        const array = _.random(1_000).toArray();

        bench('1,000 array', array).run();
    });
})