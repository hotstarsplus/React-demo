import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { MeterModel } from "./entity";

export class MeterModelDomainStore {

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

    /** 新增水表型号 */
    @action
    public addMeterModal(meterModel: MeterModel): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterModel/AddRecord",
                {
                    method: "POST",
                    body: JSON.stringify(meterModel),
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

    /** 获取水表型号数据 */
    @action
    public getMeterModelList(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/MeterModel/List?cpCode=' + cpCode, { method: "GET" })
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

    /** 删除水表型号 */
    @action
    public removeMeterModel(id: string, cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterModel/DeleteRecord/" + id + '?cpCode=' + cpCode, {
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

    /** 更新水表类型 */
    @action
    public updateMeterModel(meterModel: MeterModel): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterModel/UpdateRecord", {
                method: "POST",
                body: JSON.stringify(meterModel),
                headers: { "content-type": "application/json" }
            });
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