import { IResponseJsonResult, OridStores, requestJson } from "orid";
import { SysParameter } from "../entity/sysParameter";

export class ChargeWriteOffDoMainStore {


    public static async GetChargeWriteOffParam(): Promise<IResponseJsonResult> {
        return requestJson("/api/bdt/SysParameter/GetChargeWriteOffParam/" + OridStores.authStore.currentOperator.CpCode, { method: "GET" });
    }

    public static async saveSysParam(list: SysParameter[],): Promise<IResponseJsonResult> {
        const saveDto = {
            SysParameters: list,
            CpCode: OridStores.authStore.currentOperator.CpCode,
        }
        return requestJson("/api/bdt/SysParameter/save", {
            body: JSON.stringify(saveDto),
            headers: { "content-type": "application/json" },
            method: "POST",
        });
    }

    public static async PrePayNow(): Promise<IResponseJsonResult> {
        const saveDto = {
            PageIndex: 1,
            PageSize: 0,
            TreeValue: '',
            TreeType: 'Region',
            identity: OridStores.authStore.identity,
            cpCode: OridStores.authStore.currentOperator.CpCode,
        }
        return requestJson("/api/ccs/WriteOff/PrePayByQuery", {
            body: JSON.stringify(saveDto),
            headers: { "content-type": "application/json" },
            method: "POST",
        });
    }


    public static async QueryProgress(progressId: string): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/ProgressQuery/QueryProgress?progressId=${progressId}`,
                {
                    method: "GET"
                }
            )
        } catch (error) {
            return new Promise((res) => {
                res({
                    rtnCode: -1,
                    rtnMsg: '网络异常',
                    data: error,
                })
            })
        }
    }

}