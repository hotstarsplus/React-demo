import { SysParamDoMainStore } from "../../domainStore";
import { CopyMeterParamDoMainStore } from "../domainStore";

export interface ICopyMeterParamLayoutProps{
    copyMeterParamDoMainStore?:CopyMeterParamDoMainStore;
    sysParamStore?:SysParamDoMainStore;
}