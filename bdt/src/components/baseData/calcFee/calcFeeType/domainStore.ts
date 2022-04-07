import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";

export class CalcFeeTypeDomainStore {

    /** 获取组织树 */
    @action
    public getOrganizationTree(): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/sys/Organization/organizationtree');
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络异常",
                    data: error,
                })
            })
        }
    }

    /** 获取计费方式列表 */
    @action
    public getCalcFeeTypeList(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/CalcFeeType/GetList?cpCode=' + cpCode, { method: "GET" });
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络异常",
                    data: error,
                })
            })
        }
    }

    /**  */
    @action
    public getListByBusinessType(typeId:number,cpCode:string):Promise<IResponseJsonResult>{
        try {
            return requestJson('/api/bdt/CalcFeeType/GetListByBusinessType/' + typeId + '?cpCode=' + cpCode);
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode: -1,
                    rtnMsg: "网络异常",
                    data: error,
                })
            })
        }
    }


}