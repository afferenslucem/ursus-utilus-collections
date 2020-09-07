import { DistinctByAlgorthm } from "../distinct-by.algorithm";
import { AnyNativeAlgorithm } from "../../any/any.native/any.algorithm.native";

export class DistinctByNativeAlgorithm<T> extends DistinctByAlgorthm<T> {
    public constructor() {
        super(new AnyNativeAlgorithm());
    }
}