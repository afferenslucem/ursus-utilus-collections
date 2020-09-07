import { DistinctByAlgorthm } from "../distinct-by.algorithm";
import { AnyCustomAlgorithm } from "../../any/any.custom/any.algorithm.custom";

export class DistinctByCustomAlgorithm<T> extends DistinctByAlgorthm<T> {
    public constructor() {
        super(new AnyCustomAlgorithm());
    }
}