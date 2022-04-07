import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";
import { QuantityTapy } from "./entity";

export class QuantityTapyDomainStore {

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

    /** 获取水量类型列表 */
    @action
    public getQuantityTypeList(cpCode: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/QuantityType/List?cpCode=' + cpCode);
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

    /** 新增水量类型 */
    @action
    public addQuantityType(item: QuantityTapy): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/QuantityType/AddRecord",
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
                    data: error,
                })
            })
        }
    }

    /** 移除水量类型 */
    @action
    public removeQuantityType(id:string,cpCode:string):Promise<IResponseJsonResult>{
        try {
            return requestJson("/api/bdt/QuantityType/DeleteRecord/" + id+'?cpCode='+cpCode,
            {
                method: "POST",
                headers: { "content-type": "application/json" }
            });
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode: -1,
                    rtnMsg: "网络异常",
                    data: error,
                })
            })
        }
    }

    /** 修改水量类型 */
    @action
    public updateQuantityType(item: QuantityTapy):Promise<IResponseJsonResult>{
        try {
            return requestJson("/api/bdt/QuantityType/UpdateRecord", {
                method: "POST",
                body: JSON.stringify(item),
                headers: { "content-type": "application/json" }
            });
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode: -1,
                    rtnMsg: "网络异常",
                    data: error,
                })
            })
        }
    }

}