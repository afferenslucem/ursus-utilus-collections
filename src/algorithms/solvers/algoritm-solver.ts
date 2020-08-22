import { MATERIALIZE_TYPE_TRESHOLD } from "../../MATERIALIZE_TYPE_TRESHOLD"


export class AlgorithmSolver {
    public solve<TCustom, TNative, T>(custom: TCustom, native: TNative, array: T[]): TCustom | TNative {
        if(MATERIALIZE_TYPE_TRESHOLD < array.length) {
            return custom
        } else {
            return native
        }
    }
}