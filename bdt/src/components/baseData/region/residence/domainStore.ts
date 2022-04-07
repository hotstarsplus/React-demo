import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { Residence } from "./entity";

export class ResidenceDomainStore {

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

    /** 获取小区信息列表 */
    @action
    public getGardenList(cpCode: string, searchCases: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Garden/List/All?cpCode=" + cpCode + '&searchCase=' + searchCases, { method: "GET" });
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
    public getMaxSortNo(cpCode: string, fatherId: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Garden/GetMaxSortNo?cpCode=" + cpCode + fatherId);
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

    /** 新增小区 */
    @action
    public addResidence(model: Residence): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Garden/AddRecord", {
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

    /** 删除小区 */
    @action
    public deleteResidence(gardenId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Garden/DeleteRecord/" + gardenId + '?cpCode=' + cpCode, {
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

    /** 更新小区 */
    @action
    public updateResidence(model: Residence): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Garden/UpdateRecord", {
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