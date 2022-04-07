import { message } from "antd";
import { action,observable } from "mobx";
import { IResponseJsonResult,requestJson } from "orid";
import { PriceNormal } from "./entity";

/**
 * 普通水价操作store
 */
export class PriceNormalDoMainStore{

    /**
     * 页面显示数据的数据集合
     */
    @observable
    public list:PriceNormal[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean = false;

    /**
     * 当前编辑行
     */
    @observable
    public currentEditRow:PriceNormal;

    /**
     * 构造
     */
    constructor(){
        this.list = new Array<PriceNormal>();

        this.currentEditRow = new PriceNormal();

        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getPriceNormal = this.getPriceNormal.bind(this);
        this.updateApi = this.updateApi.bind(this);
    }

    /**
     * 加载数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?:(list:PriceNormal[]) => void){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            this.list = new Array<PriceNormal>();
            const res = await requestJson("/api/bdt/itemPrice/PriceNormal",{method:"GET"});
            if(res.rtnCode!==0){
                console.log("获取普通水价异常："+res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
                return;
            }
            const datas = res.data as PriceNormal[];
            this.list.push(...datas);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){
            console.log("获取普通水价异常："+error);
            this.isLoading = false;
        }
    }

    /**
     * 新增
     * @param priceNormal 要新增的普通水价
     */
    @action
    public async add(priceNormal:PriceNormal){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/itemPrice/PriceNormalListAdd",{method:"POST",body:JSON.stringify(priceNormal)});
            if(res.rtnCode!==0){
                console.log("新增普通水价异常："+res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            const data = res.data as PriceNormal;
            priceNormal.AutoId = data.AutoId;
            this.list.push(priceNormal);
            this.isLoading = false;

        }catch(error){
            console.log("新增普通水价异常："+error);
            this.isLoading = false;
        }
    }

    /**
     * 删除一条记录
     * @param autoId 要删除的记录的autoId
     */
    @action
    public async remove(waterKindId:string,itemId:string){
        try{
            const index = this.getIndex(waterKindId,itemId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const param = {"waterKindId":waterKindId,"itemId":itemId}
            const res = await requestJson("/api/bdt/itemPrice/PriceNormalListDelete",{method:"DELETE",body:JSON.stringify(param)});
            if(res.rtnCode!==0){
                console.log("删除失败："+res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            this.list.splice(index,1);
            console.log("删除成功");
            message.success("删除成功");
            this.isLoading = false;

        }catch(error){
            console.log(error);
            this.isLoading = false;
        }

    }

    /**
     * 编辑更新
     * @param priceNormal 要保存的普通水价 
     */
    @action
    public async update(priceNormal:PriceNormal){
        try{
            const index = this.getIndex(priceNormal.WaterKindId,priceNormal.itemId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await this.updateApi(priceNormal);
            if(res.rtnCode!==0){
                console.log("保存失败："+res.rtnMsg);
                console.log("保存失败："+res.rtnMsg);
                this.isLoading = false;
            }
            this.list[index] = priceNormal;
            this.isLoading = false;
            console.log("保存成功");
            message.success("保存成功");

        }catch(error){
            console.log(error);
            this.isLoading = false;
        }
    }

    @action
    public async updateApi (priceNormal:PriceNormal):Promise<IResponseJsonResult>{
        return await requestJson("/api/bdt/itemPrice/PriceNormalListUpdate",{method:"PUT",body:JSON.stringify(priceNormal)});
    }

    /**
     * 设置指定id的行为当前行
     * @param autoId 
     */
    @action
    public selectRow(waterKindId:string,itemId:string):boolean{
        const row = this.getPriceNormal(waterKindId,itemId);
        if(!row || row === null){
            return false;
        }
        this.currentEditRow = row;
        return true;
    }

    /**
     * 用于表单数据的服务器验证
     * @param priceNormal 
     */
    public validate(priceNormal:PriceNormal):string|undefined{
        return undefined;
    }

    /**
     * 根据水表类型id查找指定的实体
     * @param  
     */
    public getPriceNormal(waterKindId:string,itemId:string): PriceNormal | null
    {
        try {
            const index = this.getIndex(waterKindId,itemId);
            return index < 0 ? null :this.list[index];
            
        } catch (error) {
            console.log("获取当前编辑实体异常:"+error);
            return null;
        }
    }

    /**
     * 查找指定id的项目在集合中的索引
     * @param  
     */
    public getIndex(waterKindId:string,itemId:string){
        return this.list.findIndex((priceNormal:PriceNormal,index:number,priceNormals:PriceNormal[]) => {
            return priceNormal.WaterKindId === waterKindId&&priceNormal.itemId === itemId;
        })
    }

}