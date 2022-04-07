import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { ThirdPartyInvoiceParam } from "./entity";

export class ThirdPartyInvoiceParamDomainStore {

    /** 通过产品id获取列表 */
    @action
    public getListByProductItemId(productItemId: any, cpcode: any): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/ThirdPartyInvoiceParam/List/" + productItemId + "?cpCode=" + cpcode);
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络错误",
                    data: error,
                })
            })
        }
    }

    /** 获取优惠政策类型 */
    @action
    public getTaxPreCon(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/ThirdPartyInvoiceParam/TaxPreConList?cpCode=" + cpCode);
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络错误",
                    data: error,
                })
            })
        }
    }

    /** 获取税率 */
    @action
    public getTaxRate(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/ThirdPartyInvoiceParam/TaxRateList?cpCode=" + cpCode);
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络错误",
                    data: error,
                })
            })
        }
    }

    /** 新增 */
    @action
    public addThirdPartyInvoiceParam(params: ThirdPartyInvoiceParam[]): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/ThirdPartyInvoiceParam/Add", {
                body: JSON.stringify(params),
                method: "POST",
                headers: { "content-type": "application/json" }
            })
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络错误",
                    data: error,
                })
            })
        }
    }

    /** 编辑 */
    @action
    public updateThirdPartyInvoiceParam(params: ThirdPartyInvoiceParam,id:string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/ThirdPartyInvoiceParam/Update?productItemId="+id, {
                body: JSON.stringify(params),
                method: "POST",
                headers: { "content-type": "application/json" }
            })
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: "网络错误",
                    data: error,
                })
            })
        }
    }
}