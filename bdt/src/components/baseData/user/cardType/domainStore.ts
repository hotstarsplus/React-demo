import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { CardType } from "./entity";

export class CardTypeDomainStore {

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

    /** 获取数据 */
    @action
    public getCardTypeList(cpCode: string, searchCase: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/CardType/List/All?cpCode=' + cpCode + '&searchCase=' + searchCase);
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

    /** 获取最大排序号 */
    @action
    public getMaxSortNo(cpCode: string, id: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/cardType/GetMaxSortNo?cpCode=" + cpCode + id);
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

    /** 新增 */
    @action
    public addCardType(model: CardType): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/cardType/AddRecord",
                {
                    method: "POST",
                    body: JSON.stringify(model),
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

    /** 删除水卡类型 */
    @action
    public deleteCardType(id: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/cardType/DeleteRecord/" + id + '?cpCode=' + cpCode, {
                method: "POST",
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

    /** 更新水卡类型 */
    @action
    public updateCardType(model: CardType): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/cardType/UpdateRecord", {
                method: "POST",
                body: JSON.stringify(model),
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