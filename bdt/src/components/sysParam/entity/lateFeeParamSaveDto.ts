import { LateFeeParamEntity } from "./lateFeeParam";
import { SysParameter } from "./sysParameter";

export class LateFeeParamSaveDto{
    public SysParameters:SysParameter[];
    public LateFeeParam:LateFeeParamEntity;
    public CpCode:string
}