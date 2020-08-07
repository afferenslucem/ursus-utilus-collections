import { CommandId } from "./command-id";
import { FilterCondition } from "./delegates";

export interface Command {
    id: CommandId;
    function: FilterCondition<any> | any
}