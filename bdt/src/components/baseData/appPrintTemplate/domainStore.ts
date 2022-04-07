import { IResponseJsonResult, requestJson } from "orid";
import { AppPrintTemplate, PrintModal } from "./entity";

export class PrintTemplateDomainStore {

    /** 获取模板列表 */
    public getPrintTemplateList(): Promise<IResponseJsonResult> {
        try {
            return requestJson('api/bdt/AppPrintTemplate/PrintTemplate/GetList')
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

    /** 新增模板提交 */
    public addPrintTemplate(body: AppPrintTemplate): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/AppPrintTemplate/PrintTemplate/Add', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(body)
            })
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

    /** 编辑模板提交 */
    public editPrintTemplate(body: AppPrintTemplate): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/AppPrintTemplate/PrintTemplate/Update', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(body),
            })
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

    /** 删除模板提交 */
    public deletePrintTemplate(id: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/AppPrintTemplate/PrintTemplate/Delete?templateId=' + id, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })
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

    /** 获取打印模板内容 */
    public getTemplateEditData(id: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/AppPrintTemplate/PrintTemplate/GetData?templateId=' + id);
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

    /** 查询数据源数据 */
    public getDataSource(typeId: string): Promise<IResponseJsonResult> {
        try {
            return requestJson('/api/bdt/AppPrintTemplate/DataSource/GetList?typeId=' + typeId);
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

    /** 保存模板编辑内容 */
    public saveTempLate(templateId:number,body:PrintModal[]):Promise<IResponseJsonResult>{
        try {
            return requestJson('/api/bdt/AppPrintTemplate/PrintTemplate/UpdateData?templateId=' + templateId, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(body),
            })
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