import _ from './src/index';
import { filterSuite_1000000, filterSuite_1000, filterSuite_10 } from "./bench/where";
import { select_1000000, select_1000, select_10 } from "./bench/select";
import { sort_1000000, sort_1000, sort_10 } from "./bench/sort";
import { group_1000000_10, group_1000000_25, group_1000000_50, group_1000_10, group_1000_25, group_1000_50, group_100_10, group_100_25, group_100_50 } from "./bench/group";
import { agg_1000000, agg_1000, agg_10 } from "./bench/aggregates";
import { agg_by_1000000, agg_by_1000, agg_by_100 } from "./bench/aggregates-by";
import { comp_1000000, comp_1000, comp_10 } from "./bench/composites";

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

agg_1000000.run({
    async: false
});

agg_1000.run({
    async: false
});

agg_10.run({
    async: false
});

agg_by_1000000.run({
    async: false
});

agg_by_1000.run({
    async: false
});

agg_by_100.run({
    async: false
});

comp_1000000.run({
    async: false
});

comp_1000.run({
    async: false
});

comp_10.run({
    async: false
});