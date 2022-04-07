import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { SpecialProcessType } from "./entity";

export class SpecialProcessTypeDomainStore {

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

    /** 加载数据 */
    @action
    public getMeterSpecialTypeList(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterSpecialType/List?cpCode=" + cpCode, { method: "GET" });
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

    /** 更新 */
    @action
    public updateRecord(item:SpecialProcessType):Promise<IResponseJsonResult>{
        try {
            return requestJson("/api/bdt/MeterSpecialType/UpdateRecord", {
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