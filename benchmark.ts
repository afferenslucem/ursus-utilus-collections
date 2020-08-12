import Benchmark from "benchmark";
import _ from './src/index';
import lodash from 'lodash';
import { array } from "./bench/common/suite";
import { filterSuite_1000000, filterSuite_1000, filterSuite_10 } from "./bench/where";
import { select_1000000, select_1000, select_10 } from "./bench/select";
import { sort_1000000, sort_1000, sort_10 } from "./bench/sort";
import { group_1000000_10, group_1000000_25, group_1000000_50, group_1000_10, group_1000_25, group_1000_50, group_100_10, group_100_25, group_100_50 } from "./bench/group";

filterSuite_1000000.run({
    async: false
});

filterSuite_1000.run({
    async: false
});

filterSuite_10.run({
    async: false
});

select_1000000.run({
    async: false
});

select_1000.run({
    async: false
});

select_10.run({
    async: false
});

sort_1000000.run({
    async: false
});

sort_1000.run({
    async: false
});

sort_10.run({
    async: false
});

group_1000000_10.run({
    async: false
});

group_1000000_25.run({
    async: false
});

group_1000000_50.run({
    async: false
});

group_1000_10.run({
    async: false
});

group_1000_25.run({
    async: false
});

group_1000_50.run({
    async: false
});

group_100_10.run({
    async: false
});

group_100_25.run({
    async: false
});

group_100_50.run({
    async: false
});