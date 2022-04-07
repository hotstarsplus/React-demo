import { SysParamDoMainStore } from "../../domainStore";
import { LateFeeParamDoMainStore } from "../domainStore";

export interface ILateFeeParamLayoutProps{

    lateFeeParamStore?:LateFeeParamDoMainStore;

    sysParamStore?:SysParamDoMainStore;
}