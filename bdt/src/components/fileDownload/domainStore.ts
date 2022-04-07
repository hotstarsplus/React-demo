
import { IResponseJsonResult, replaceUndefined, requestJson } from 'orid';
class DownLoadFilesDomainStore{ 

    /**
     * 获取模块列表
     */
    public GetUserShortcutKey(): Promise<IResponseJsonResult> {
        try{
            return requestJson("/api/sys/UserShortcutKey/GetKey", {
                method: "GET",
            })
        }catch(e) {
            return new Promise(rej => {
                rej({
                    rtnCode: -1,
                    rtnMsg: "网络异常!"
                })
            })
        }
    }


    /**
     * 获取下载列表
     */
    public GetFileInfos(obj: object): Promise<IResponseJsonResult> {
        try{
            return requestJson("/api/bdt/FileDownInfo/GetFileInfos"+ this.getCanelC(replaceUndefined(obj, "", [undefined])), {
                method: "GET",
            })
        }catch(e) {
            return new Promise(rej => {
                rej({
                    rtnCode: -1,
                    rtnMsg: "网络异常!"
                })
            })
        }
    }

    /**
     * 获取某条数据列表
     */
    public GetFileInfo(processId: string): Promise<IResponseJsonResult> {
        try{
            return requestJson("/api/bdt/FileDownInfo/GetFileInfos?processId="+ processId, {
                method: "GET",
            })
        }catch(e) {
            return new Promise(rej => {
                rej({
                    rtnCode: -1,
                    rtnMsg: "网络异常!"
                })
            })
        }
    }

    /**
     * 获取某条数据列表
     */
    public getListByCpCode(cpcode: string): Promise<IResponseJsonResult> {
        try{
            return requestJson("/api/sys/CpUser/GetListByCpCode?cpCode="+ cpcode, {
                method: "GET",
            })
        }catch(e) {
            return new Promise(rej => {
                rej({
                    rtnCode: -1,
                    rtnMsg: "网络异常!"
                })
            })
        }
    }
    

    private getCanelC(c: {} | undefined,first: boolean = true) {
        if (!c) { return "" };
        let s = "";
        Object.keys(c).map((model) => {
            s += (model + "") + "=" + c[model] + "&";
        }).toString()
        return (first? "?": "&") + s.substring(0, s.length - 1);
    }
}


export { DownLoadFilesDomainStore };
