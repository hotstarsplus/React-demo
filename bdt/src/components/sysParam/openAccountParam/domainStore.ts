import { observable } from "mobx";
import { IResponseJsonResult, OridStores, requestJson } from "orid";
import { IdRuleEntity } from "../entity/IdRuleEntity";
import { OpenAccountParamSaveDto } from "../entity/openAccountParamSaveDto";

export class OpenAccountParamDoMainStore{
    @observable
    public CustomerNoRules:IdRuleEntity[];
    @observable
    public WaterUserNoRules:IdRuleEntity[];
    @observable
    public CurrentCustomerNoRule:IdRuleEntity;
    @observable
    public CurrentWaterUserNoRule:IdRuleEntity;
    @observable
    public CustomerNoRuleName:string=''
    @observable
    public WaterUserNoRuleName:string=''
    @observable
    public CustomerNoRuleNameLoad:string=''
    @observable
    public WaterUserNoRuleNamesLoad:string=''
    @observable
    public isSelected:boolean=false

    @observable
    public LoadDataArray:any[]=[]

    constructor(){
        this.CustomerNoRules=new Array<IdRuleEntity>();
        this.WaterUserNoRules=new Array<IdRuleEntity>();
        this.CurrentCustomerNoRule=new IdRuleEntity();
        this.CurrentWaterUserNoRule=new IdRuleEntity();
    }

    public async GetNumberRule(numberType:string):Promise<IResponseJsonResult>{
        const res = await requestJson("/api/CRM/NumberRule/GetListByNumberType?numberType="+numberType+'&cpCode='+OridStores.authStore.currentOperator.CpCode,{method:"GET"});
        return res;
    }

    public async GetNumberRuleById(ruleId:string):Promise<IResponseJsonResult>{
        this.CustomerNoRuleNameLoad=this.CustomerNoRuleName
        this.WaterUserNoRuleNamesLoad=this.WaterUserNoRuleName
        const res = await requestJson("/api/CRM/NumberRule/getCurrentRule?ruleId="+ruleId+'&cpCode='+OridStores.authStore.currentOperator.CpCode,{method:"GET"});
        return res;
    }

    // 增加开户规则判断
    public async Check(entity:OpenAccountParamSaveDto):Promise<IResponseJsonResult>{
        const res = await requestJson("/api/crm/Customer/CheckOpenAccountParam?cpCode="+OridStores.authStore.currentOperator.CpCode,{
            body:JSON.stringify(entity),
            headers:{"content-type":"application/json"},
            method:"POST",
        });
        return res;
    }

    public async Update(entity:OpenAccountParamSaveDto):Promise<IResponseJsonResult>{
        const res = await requestJson("/api/bdt/SysParameter/saveOpenAccountParam?cpCode="+OridStores.authStore.currentOperator.CpCode,{
            body:JSON.stringify(entity),
            headers:{"content-type":"application/json"},
            method:"POST",
        });
        return res;
    }

}