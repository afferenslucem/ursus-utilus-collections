import { MapCondition, CompareCondition } from "../commands/delegates";
export interface SortSettings<T, E> {
    mapping?: MapCondition<T, E>;
    compare?: CompareCondition<E>;
}

export class Comparer<T, E = T> {
    public constructor(private sortSettings: SortSettings<T, E>[], private defaultCompare: CompareCondition<E>){}

    public compare(first: T, second: T): number {
        for(let i = 0; i < this.sortSettings.length; i++) {
            const sorting = this.sortSettings[i];

            const [mappedFirst, mappedSecond] = this.map(first, second, sorting.mapping);

            const compare = sorting.compare ?? this.defaultCompare;

            // @ts-ignore
            const result = compare(mappedFirst, mappedSecond);

            if(result != 0) {
                return result;
            }
        }

        return 0;
    }

    private map<E>(first: T, second: T, mapping?: MapCondition<T, E>): [E, E] | [T, T] {
        if(mapping) {
            return [
                mapping(first),
                mapping(second)
            ]
        } else {
            return [first, second];
        }
    }
}