import { observable } from "mobx";
import { IResponseJsonResult, OridStores, requestJson } from "orid";
import { CopyMeterParamDto } from "../entity/CopyMeterParamDto";
import { QuantityCompareParamEntity } from "../entity/QuantityCompareParamEntity";


export class CopyMeterParamDoMainStore{

    @observable
    public CopyMeterParamEntity:CopyMeterParamDto;

    @observable
    public QuantityParamDto:QuantityCompareParamEntity;
    /** 接口返回的存储值 */
    @observable
    public QuantityParamDtos:QuantityCompareParamEntity;

    @observable
    public AlarmQuantityIndex:string;

    constructor(){
        this.AlarmQuantityIndex="";
        this.CopyMeterParamEntity = new CopyMeterParamDto();
        this.QuantityParamDto = new QuantityCompareParamEntity();
        this.GetCopyMeterParam = this.GetCopyMeterParam.bind(this);
        
    }

    /**
     * 获取抄表参数
     */
    public async GetCopyMeterParam():Promise<IResponseJsonResult>{
        const res = await requestJson("/api/bdt/SysParameter/GetCopyMeterParam/"+OridStores.authStore.currentOperator.CpCode,{method:"GET"});
        return res;
    }

    /**
     * 更新抄表参数
     */
    public async Update(entity:CopyMeterParamDto):Promise<IResponseJsonResult>{
        const res = await requestJson("/api/bdt/SysParameter/SaveCopyMeterParam/"+OridStores.authStore.currentOperator.CpCode,{
            body:JSON.stringify(entity),
            headers:{"content-type":"application/json"},
            method:"POST",
        });
        return res;
    }
}