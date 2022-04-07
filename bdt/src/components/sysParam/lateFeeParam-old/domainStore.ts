import { action, observable, toJS } from "mobx";
import { IResponseJsonResult, OridStores, requestJson } from "orid";
import { LateFeeParamEntity } from "../entity/lateFeeParam";
import { LateFeeParamSaveDto } from "../entity/lateFeeParamSaveDto";
import { SysParameter } from "../entity/sysParameter";

export class LateFeeParamDoMainStore {
    /**
     * 违约金实体
     * 貌似没用着，舍弃
     */
    // @observable
    // public LateFeeParam: LateFeeParamEntity;

    @observable
    public sysParams: SysParameter[];

    constructor() {
        // this.LateFeeParam = new LateFeeParamEntity();
        this.sysParams = new Array<SysParameter>();
    }
    /**
     * 保存违约金参数
     * @param list sysParmeter集合
     * @param lateFeeParm LateFeeParamEntity实体
     */
    @action
    public async saveSysParam(list: SysParameter[], lateFeeParm: LateFeeParamEntity): Promise<IResponseJsonResult> {
        const saveDto = new LateFeeParamSaveDto();
        saveDto.SysParameters = list;
        console.log("saveSysParam_list", toJS(list))
        saveDto.CpCode = OridStores.authStore.currentOperator.CpCode
        saveDto.LateFeeParam = lateFeeParm;
        console.log("saveSysParam_LateFeeParam", toJS(lateFeeParm))
        saveDto.SysParameters[0].CpCode = OridStores.authStore.currentOperator.CpCode
        const res = await requestJson("/api/bdt/SysParameter/saveLateFeeParam", {
            body: JSON.stringify(saveDto),
            headers: { "content-type": "application/json" },
            method: "POST",
        });
        return res;
    }

    /**
     * 重新计算违约金
     */
     public async CanelPenalty():Promise<IResponseJsonResult>{
        try {
            return await requestJson(`/api/ccs/CalculateLateFee/CalculateLateFeeByUserNo`, { 
                body: JSON.stringify({
                    CpCode: OridStores.authStore.currentOperator.CpCode,
                    UserNoList: []
                }),
                headers: { "content-type": "application/json" },
                method: "POST",
            });

        } catch (error) {
            console.log(error);
            return { rtnCode:1,rtnMsg:error.toString()}
        }
}


    /**
     * 获取违约金系统参数
     */
    public async GetLaterFeeSysParams() {
        if (this.sysParams.length !== 0) {
            this.sysParams.splice(0, this.sysParams.length);
        }
        const res = await requestJson("/api/bdt/SysParameter/getLateFeeSysParams");
        if (res.rtnCode !== 0) {
            return;
        }
        const data = res.data as SysParameter[];
        this.sysParams = data;

    }
}