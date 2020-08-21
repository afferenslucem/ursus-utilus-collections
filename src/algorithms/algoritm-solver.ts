import { MATERIALIZE_TYPE_TRESHOLD } from "../MATERIALIZE_TYPE_TRESHOLD";
import { IAlgorithm } from "./i-algorithm";

export class AlgorithmSolver {
    public static solve<TCustom, TNative, T>(custom: TCustom, native: TNative, array: T[]): TCustom | TNative {
        if(MATERIALIZE_TYPE_TRESHOLD < array.length) {
            return custom
        } else {
            return native
        }
    }
}