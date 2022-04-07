import { SelectValue } from "antd/lib/select";
import { ReminderParameterDomainStore } from "../../domianStore";

export interface IAlertMessageTypeSelectProps{
    reminderParameterStore?:ReminderParameterDomainStore
    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    value?:string;
}