import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { PayType } from "./entity";

export class PayTypeDomainStore {

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

    /** 获取支付方式 */
    @action
    public getPayTypeList(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/PayType/List?cpCode=" + cpCode);
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

    /** 修改支付信息 */
    @action
    public updatePayType(item: PayType): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/PayType/UpdateRecord", {
                method: "POST",
                body: JSON.stringify(item),
                headers: { "content-type": "application/json" }
            });
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
}