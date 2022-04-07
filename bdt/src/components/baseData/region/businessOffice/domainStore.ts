import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { BusinessOffice } from "./entity";

export class BusinessOfficeDomainStore {

    /** 查询组织树 */
    @action
    public organizationTree(): Promise<IResponseJsonResult> {
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

    /** 查询营业网点数据 */
    @action.bound
    public getBusinessOfficeList(cpCode: string, searchCase: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/BusinessOffice/List/All?cpCode=" + cpCode + '&searchCase=' + searchCase, { method: "GET" });
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
            return requestJson("/api/bdt/BusinessOffice/GetMaxSortNo?fatherId=" + fatherId + '&cpCode=' + cpCode);
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

    /** 新增营业网点 */
    @action
    public addBusinessOffice(model: BusinessOffice): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/BusinessOffice/AddRecord", {
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

    /** 删除营业网点 */
    @action
    public DeleteBusinessOffice(businessOfficeId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/BusinessOffice/DeleteRecord/" + businessOfficeId + '?cpCode=' + cpCode, {
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

    /** 修改营业网点 */
    @action
    public UpdateBusinessOffice(model: BusinessOffice): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/BusinessOffice/UpdateRecord",
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
                    data: error
                })
            })
        }
    }



}