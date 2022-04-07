import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { WaterStation } from "./entity";

export class WaterStationDomainStore {

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

    /** 加载数据 */
    @action
    public async getWaterStationList(cpCode: string, searchCase: string): Promise<IResponseJsonResult> {
        try {
            return await  requestJson("/api/bdt/WaterStation/List/All?cpCode=" + cpCode + '&searchCase=' + searchCase, { method: "GET" });
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
    public getMaxSortNo(FatherId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/WaterStation/GetMaxSortNo?fatherId=" + FatherId + '&cpCode=' + cpCode)
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

    /** 新增供水所 */
    @action
    public AddWaterStation(model: WaterStation): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/WaterStation/AddRecord", {
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

    /** 删除供水所 */
    @action
    public DeleteWaterStation(WaterStationId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/WaterStation/DeleteRecord/" + WaterStationId + '?cpCode=' + cpCode,
                {
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
    /** 编辑 */
    @action
    public UpdateWaterStation(model: WaterStation): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/WaterStation/UpdateRecord",
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

    /** 根据fatherId获取父级名称 */
    @action
    public getNameByKey(fatherId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/WaterStation/GetNameByKey/" + fatherId + "?cpCode=" + cpCode);
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