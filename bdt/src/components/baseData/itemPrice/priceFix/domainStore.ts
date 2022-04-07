import { message } from "antd";
import { action,observable } from "mobx";
import { IResponseJsonResult,requestJson, } from "orid";
import { PriceFix } from "./entity";

/**
 * 固定费用价格操作store
 */
export class PriceFixDoMainStore{

    /**
     * 页面显示数据的数据集合
     */
    @observable
    public list:PriceFix[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean = false;

    /**
     * 当前编辑行
     */
    @observable
    public currentEditRow:PriceFix;

    /**
     * 构造
     */
    constructor(){
        this.list = new Array<PriceFix>();

        this.currentEditRow = new PriceFix();

        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getPriceFix = this.getPriceFix.bind(this);

        this.updateApi = this.updateApi.bind(this);

    }

    /**
     * 加载数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?:(list:PriceFix[]) => void){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            this.list = new Array<PriceFix>();
            const res = await requestJson("/api/bdt/itemPrice/PriceFix",{method:"GET"});
            if(res.rtnCode!==0){
                console.log("获取普固定费用价格异常："+res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
                return;
            }
            const datas = res.data as PriceFix[];
            this.list.push(...datas);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){
            console.log("获取普固定费用价格异常："+error);
            this.isLoading = false;
        }
    }

    /**
     * 新增
     * @param priceFix 要新增的固定费用价格
     */
    @action
    public async add(priceFix:PriceFix){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/itemPrice/PriceFixListAdd",{method:"POST",body:JSON.stringify(priceFix)});
            if(res.rtnCode!==0){
                console.log("新增普固定费用价格异常："+res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            const data = res.data as PriceFix;
            priceFix.AutoId = data.AutoId;
            this.list.push(priceFix);
            this.isLoading = false;

        }catch(error){
            console.log("新增普固定费用价格异常："+error);
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
            const res = await requestJson("/api/bdt/itemPrice/PriceFixListDelete",{method:"DELETE",body:JSON.stringify(param)});
            if(res.rtnCode!==0){
                console.log("删除失败："+res.rtnMsg);
                message.success("删除失败："+res.rtnMsg);
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
     * @param priceFix 要保存的固定费用价格 
     */
    @action
    public async update(priceFix:PriceFix){
        try{
            const index = this.getIndex(priceFix.WaterKindId,priceFix.itemId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await this.updateApi(priceFix);
            if(res.rtnCode!==0){
                console.log("保存失败："+res.rtnMsg);
                console.log("保存失败："+res.rtnMsg);
                this.isLoading = false;
            }
            this.list[index] = priceFix;
            this.isLoading = false;
            console.log("保存成功");
            message.success("保存成功");

        }catch(error){
            console.log(error);
            this.isLoading = false;
        }
    }

    @action
    public async updateApi(priceFix:PriceFix):Promise<IResponseJsonResult>{
        return await requestJson("/api/bdt/itemPrice/PriceFixListUpdate",{method:"PUT",body:JSON.stringify(priceFix)});
    }

    /**
     * 设置指定id的行为当前行
     * @param autoId 
     */
    @action
    public selectRow(waterKindId:string,itemId:string):boolean{
        const row = this.getPriceFix(waterKindId,itemId);
        if(!row || row === null){
            return false;
        }
        this.currentEditRow = row;
        return true;
    }

    /**
     * 用于表单数据的服务器验证
     * @param priceFix 
     */
    public validate(priceFix:PriceFix):string|undefined{
        return undefined;
    }

    /**
     * 根据水表类型id查找指定的实体
     * @param autoId 
     */
    public getPriceFix(waterKindId:string,itemId:string): PriceFix | null
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
     * @param autoId 项目的id
     */
    public getIndex(waterKindId:string,itemId:string){
        return this.list.findIndex((priceFix:PriceFix,index:number,priceFixs:PriceFix[]) => {
            return priceFix.WaterKindId === waterKindId&&priceFix.itemId === itemId;
        })
    }

}