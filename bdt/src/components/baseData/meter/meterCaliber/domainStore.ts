import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { MeterCaliber } from "./entity";

export class MeterCaliberDomainStore {

    @action
    public getCompanyName(): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/sys/Organization/organizationtree`);
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

    /** 获取水表口径列表 */
    @action
    public getMeterCaliberList(CompanyName: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/MeterCaliber/List?cpCode=' + CompanyName);
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


    /** 新增水表  */
    @action
    public addMeterInfo(item: MeterCaliber): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/meterCaliber/AddRecord",
                {
                    method: "POST",
                    body: JSON.stringify(item),
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

    /**
     * 删除
     * @param id 
     * @param CompanyName 
     * @returns 
     */
    @action
    public removeMeterInfo(id: string, CompanyName: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterCaliber/DeleteRecord/" + id + '?cpCode=' + CompanyName,
                {
                    method: "POST",
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

    /**
     * 编辑
     * @param item 
     * @returns 
     */
    @action
    public updateMeterInfo(item: MeterCaliber): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterCaliber/UpdateRecord", {
                method: "POST",
                body: JSON.stringify(item),
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