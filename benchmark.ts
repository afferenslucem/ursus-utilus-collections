import _ from './src/index';
import { filterSuite_1000000, filterSuite_1000, filterSuite_10 } from "./bench/where";
import { select_1000000, select_1000, select_10 } from "./bench/select";
import { sort_1000000, sort_1000, sort_10 } from "./bench/sort";
import { group_1000000_10, group_1000000_25, group_1000000_50, group_1000_10, group_1000_25, group_1000_50, group_100_10, group_100_25, group_100_50 } from "./bench/group";
import { agg_1000000, agg_1000, agg_10 } from "./bench/aggregates";
import { agg_by_1000000, agg_by_1000, agg_by_100 } from "./bench/aggregates-by";
import { comp_1000000, comp_1000, comp_10 } from "./bench/composites";
import { reverse_1000000, reverse_1000, reverse_10 } from './bench/reverse';
import { distinctSuite_1000000, distinctSuite_1000, distinctSuite_10 } from './bench/distinct';

// filterSuite_1000000.run();

// filterSuite_1000.run();

// filterSuite_10.run();

// select_1000000.run();

// select_1000.run();

// select_10.run();

// sort_1000000.run();

// sort_1000.run();

// sort_10.run();

// group_1000000_10.run();

// group_1000000_25.run();

// group_1000000_50.run();

// group_1000_10.run();

// group_1000_25.run();

// group_1000_50.run();

// group_100_10.run();

// group_100_25.run();

// group_100_50.run();

// agg_1000000.run();

// agg_1000.run();

// agg_10.run();

// agg_by_1000000.run();

// agg_by_1000.run();

// agg_by_100.run();

// comp_1000000.run();

// comp_1000.run();

// comp_10.run();

// reverse_1000000.run()

// reverse_1000.run()

// reverse_10.run()

distinctSuite_1000000.run()

distinctSuite_1000.run()

distinctSuite_10.run()