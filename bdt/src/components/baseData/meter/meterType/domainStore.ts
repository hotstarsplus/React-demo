import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { MeterType } from "./entity";

export class MeterTypeDomainStore {

    @action
    public getCompanyName(): Promise<IResponseJsonResult> {
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

    /** 获取水表类型列表 */
    @action
    public getMeterTypeList(cpCode: string, searchCases: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterType/List/All?cpCode=" + cpCode + '&searchCase=' + searchCases, { method: "GET" })
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
            return requestJson("/api/bdt/MeterType/GetMaxSortNo?cpCode=" + cpCode + fatherId);
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

    /** 新增水表类型 */
    @action
    public addMeterType(model: MeterType): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterType/AddRecord",
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

    /** 删除水表类型 */
    @action
    public deleteMeterType(item: MeterType, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterType/DeleteRecord/" + item.MeterTypeId + '?cpCode=' + cpCode,
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

    /** 更新水表类型信息 */
    @action
    public UpdateMeterType(model: MeterType): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterType/UpdateRecord",
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

    /**
     * 根据fatherId获取父级名称
     * @param fatherId 父级ID
     * @param cpCode 
     * @returns 
     */
    @action
    public getPName(fatherId: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterType/GetNameByKey/" + fatherId + '?cpCode=' + cpCode);
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

    /** 根据条件查询信息 */
    @action
    public search(param: any, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterType/List/LikeValue?cpCode=" + cpCode,
                {
                    method: "POST",
                    body: JSON.stringify(param),
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