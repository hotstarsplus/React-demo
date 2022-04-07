import { SysParamDoMainStore } from "../../domainStore";
import { OpenAccountParamDoMainStore } from "../domainStore";

export interface IOpenAccountParamLayoutProps{
    openAccountParamStore?:OpenAccountParamDoMainStore;
    sysParamStore?:SysParamDoMainStore;
}