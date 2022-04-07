import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { PayBank } from "./entity";

export class PayBankDomainStore {

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
                    data: error
                })
            })
        }
    }

    /** 获取银行信息列表 */
    @action
    public getAgentBankList(cpCode: string, searchCase: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/AgentBank/List/All?cpCode=" + cpCode + '&searchCase=' + searchCase, { method: "GET" });
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
    public getMaxSortNo(fatherId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/AgentBank/GetMaxSortNo?fatherId=" + fatherId + '&cpCode=' + cpCode);
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

    /** 新增银行 */
    @action
    public addPayBank(model: PayBank): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/AgentBank/AddRecord",
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

    /** 删除银行 */
    @action
    public deletePayBank(AgentBankId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/AgentBank/DeleteRecord/" + AgentBankId + '?cpCode=' + cpCode, {
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

    /** 编辑银行信息 */
    @action
    public updatePayBank(model: PayBank): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/AgentBank/UpdateRecord", {
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