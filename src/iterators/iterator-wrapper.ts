import { Iterator } from "./iterator";
import { IIterator } from "../interfaces/i-iterator";

export abstract class IteratorWrapper<T> extends Iterator<T> {
    protected constructor(protected inner: IIterator<T>){
        super();
    }
 
    public getFinished(): boolean {
        return this.inner.getFinished();
    }
}