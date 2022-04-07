import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { MeterState } from "./entity";

export class MeterStateDomainStore {

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
    public getMeterStateList(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/MeterState/List?cpCode=' + cpCode, { method: 'GET' });
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
    public updateRecord(item: MeterState): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/MeterState/UpdateRecord", {
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