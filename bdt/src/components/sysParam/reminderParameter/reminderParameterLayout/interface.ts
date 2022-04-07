import { BusinessTypeDoMainStore } from "../../../baseData/system/businessType/doMainStore";
import { SysParamDoMainStore } from "../../domainStore";
import { ReminderParameterDomainStore } from "./domianStore";

export interface IReminderParameterLayoutProps{
    
    GlobalBusinesstypeStore?:BusinessTypeDoMainStore
    reminderParameterStore?:ReminderParameterDomainStore;
    sysParamStore?:SysParamDoMainStore;
}