import { BusinessTypeDoMainStore } from "../baseData/system/businessType/doMainStore";
import { CopyMeterParamDoMainStore } from "./copyMeterParam/domainStore";
import { SysParamDoMainStore } from "./domainStore";
import { InvoiceingParametersdoMainStore } from "./invoicingParameters/doMainStore";
import { LateFeeParamDoMainStore } from "./lateFeeParam-old/domainStore";
import { OpenAccountParamDoMainStore } from "./openAccountParam/domainStore";
import { ReminderParameterDomainStore } from "./reminderParameter/reminderParameterLayout/domianStore";
const sysParamStores = {
    lateFeeParamStore:new LateFeeParamDoMainStore(),

    sysParamStore:new SysParamDoMainStore(),
    openAccountParamStore:new OpenAccountParamDoMainStore(),
    reminderParameterStore: new ReminderParameterDomainStore(),
    GlobalBusinesstypeStore:new BusinessTypeDoMainStore(),
    InvoicingParametersdoMainStore:new InvoiceingParametersdoMainStore(),
    copyMeterParamDoMainStore:new CopyMeterParamDoMainStore(),
 }

 export default sysParamStores;