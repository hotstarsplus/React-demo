import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { Region } from "./entity";

export class RegionDomainStore {

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

    /** 查询片区数据 */
    @action
    public getRegionList(cpCode: string, searchCase: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Region/List/All?cpCode=" + cpCode + '&searchCase=' + encodeURIComponent(searchCase), { method: "GET" });
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

    /** 新增片区 */
    @action
    public AddRegion(model: Region): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Region/AddRecord", {
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

    /** 删除片区 */
    @action
    public DeleteRegion(RegionId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Region/DeleteRecord/" + RegionId + '?cpCode=' + cpCode, {
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

    /** 修改片区 */
    @action
    public UpdateRegion(model: Region): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/Region/UpdateRecord", {
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