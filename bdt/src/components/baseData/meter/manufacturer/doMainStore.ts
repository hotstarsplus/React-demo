import { IResponseJsonResult, requestJson } from "orid"
import { Manufacturer } from "./entity";

export class ManufacturerDomainStore{
    
    public getCompanyName():Promise<IResponseJsonResult>{
        try {
            return requestJson('/api/sys/Organization/organizationtree');
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode:-1,
                    rtnMsg:"网络异常",
                    data:error,
                })
            })
        }
    }

    /** 加载数据 */
    public getList(CompanyName:string):Promise<IResponseJsonResult>{
        try {
            return requestJson(`/api/bdt/Manufacturer/List?cpCode=`+CompanyName)
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode:-1,
                    rtnMsg:"网络错误",
                    data:error,
                })
            })
        }
    }

    /**
     * 新增数据
     * @param item 新增的项目
     * @returns 
     */
    public addData(item:Manufacturer):Promise<IResponseJsonResult>{
        try {
            return requestJson("/api/bdt/Manufacturer/AddRecord",
            {
                method: "POST",
                body: JSON.stringify(item),
                headers: { "content-type": "application/json" }
            })
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode:-1,
                    rtnMsg:"网络异常",
                    data:error,
                })
            })
        }
    }

    /**
     * 删除数据
     * @param id 删除的ID
     * @param CompanyName 替换的cpcode 
     * @returns 
     */
    public deleteData(id:string,CompanyName:string):Promise<IResponseJsonResult>{
        try {
            return requestJson("/api/bdt/Manufacturer/DeleteRecord/"+id+"?cpCode="+CompanyName,
            {
                method: "POST",
                headers: { "content-type": "application/json" }
            });
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode:-1,
                    rtnMsg:"网络异常",
                    data:error,
                })
            })
        }

    }

    /**
     * 更新数据
     * @param item 更新的数据
     * @returns 
     */
    public updateData(item:Manufacturer):Promise<IResponseJsonResult>{
        try {
            return requestJson("/api/bdt/Manufacturer/UpdateRecord",{
                method:"POST",
                body:JSON.stringify(item),
                headers: { "content-type": "application/json" }
            });
        } catch (error) {
            return new Promise((res)=>{
                res({
                    rtnCode:-1,
                    rtnMsg:"网络异常",
                    data:error
                })
            })
        }
    }

}