import {Collection} from './collections/collection';
import { ICollection } from './interfaces/i-collection';

export * from './interfaces/i-collection';

export default function<T>(items: T[]): ICollection<T> {
    return new Collection<T>(items);
}