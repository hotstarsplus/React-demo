import { message } from "antd";
import { action,observable } from "mobx";
import { IResponseJsonResult,requestJson } from "orid";
import { PriceSuperPlan } from "./entity";

/**
 * 超计划水价操作方法
 */
export class PriceSuperPlanDoMainStore{
    
    /**
     * 超计划价格集合
     */
    @observable
    public list:PriceSuperPlan[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean = false;

    /**
     * 当前选择的要编辑的行
     */
    @observable
    public currentEditRow:PriceSuperPlan;

    constructor(){
        this.list = new Array<PriceSuperPlan>();

        this.currentEditRow = new PriceSuperPlan();

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);

        this.getIndex = this.getIndex.bind(this);
        this.getPriceSuperPlan = this.getPriceSuperPlan.bind(this);

        this.updateApi = this.updateApi.bind(this);

    }

    /**
     * 获取数据
     * @param callBack 
     */
    @action
    public async loadData(callBack?:(list:PriceSuperPlan[]) => void){
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            this.list = new Array<PriceSuperPlan>();
            const res = await requestJson("/api/bdt/itemPrice/PriceSuperPlan",{method:"GET"});
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                console.log("加载超计划水价时发生异常：" + res.rtnMsg);
                this.isLoading = false;
                return;
            }
            const datas = res.data as PriceSuperPlan[];
            this.list.push(...datas);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }
        }catch(error){
            console.log("加载超计划水价时发生异常："+error);
            this.isLoading = false;
        }

    }

    /**
     * 新增
     * @param priceSuperPlan 要新增的实体
     */
    @action
    public async add(priceSuperPlan:PriceSuperPlan){
        try{
            const res = await requestJson("/api/bdt/itemPrice/PriceSuperPlanListAdd",{method:"POST",body:JSON.stringify(priceSuperPlan)});
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                console.log("新增超计划水价时发生异常：" + res.rtnMsg);
                return;
            }
            const data = res.data as PriceSuperPlan;
            priceSuperPlan.AutoId = data.AutoId;
            this.list.push(priceSuperPlan);
            message.success("新增成功");
            console.log("新增成功");

        }catch(error){
            console.log("新增超计划水价时发生异常：" + error);
        }
    }

    /**
     * 删除一行
     * @param autoId autoId
     */
    @action
    public async remove(waterKindId: string,waterRateItemId:string)
    {
        try{
            const index = this.getIndex(waterKindId,waterRateItemId);
            if(index<0){
                return;
            }
            const param = {"waterKindId":waterKindId,"waterRateItemId":waterRateItemId}
            const res = await requestJson("/api/bdt/itemPrice/PriceSuperPlanListDelete",{method:"DELETE",body:JSON.stringify(param)});
            if(res.rtnCode!==0){
                
                message.error(res.rtnMsg);
                console.log("删除超计划水价时发生异常：" + res.rtnMsg);
                return;
            }
            this.list.splice(index,1);
            message.success("删除成功");
            console.log("删除成功");


        }catch(error){
            console.log("删除超计划水价时发生异常：" + error);
        }

    }

    /**
     * 编辑保存
     * @param priceSuperPlan 编辑后的实体
     */
    @action
    public async update(priceSuperPlan:PriceSuperPlan){
        try{
            const index = this.getIndex(priceSuperPlan.WaterKindId,priceSuperPlan.WaterRateItemId);
            if(index<0) {
                return;
            }
            const res = await this.updateApi(priceSuperPlan);
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                console.log("更新超计划水价时发生异常：" + res.rtnMsg);
                return;
            }

            this.list[index] = priceSuperPlan;
            message.success("保存成功");
            console.log("保存成功");

        }catch(error){
            console.log(error);

        }
    }

    @action
    public async updateApi(priceSuperPlan:PriceSuperPlan):Promise<IResponseJsonResult>{
      return await requestJson("/api/bdt/itemPrice/PriceSuperPlanListUpdate", {method:"PUT",body:JSON.stringify(priceSuperPlan)});
    }

    /**
     * 根据id获取某一行的数据
     * @param autoId autoId
     */
    @action
    public selectRow(waterKindId: string,waterRateItemId:string):boolean{
        const row = this.getPriceSuperPlan(waterKindId,waterRateItemId);
        if(!row || row === null){
            return false;
        }
        this.currentEditRow = row;
        return true;
    }

    public validate(value:PriceSuperPlan):string | undefined{

        return undefined;
    }

    /**
     * 根据水表类型id查找指定的实体
     * @param id 水表类型id
     */
    public getPriceSuperPlan(waterKindId: string,waterRateItemId:string):PriceSuperPlan | null
    {
        const index = this.getIndex(waterKindId,waterRateItemId);
        return index < 0 ? null : this.list[index];
    }

    /**
     * 查找指定id的项目的在集合中的索引
     * 
     * @param {string} id 项目的id
     * @returns {number} 项目的索引
     */
    private getIndex(waterKindId: string,waterRateItemId:string): number {
        return this.list.findIndex((priceSuperPlan: PriceSuperPlan, index: number, priceSuperPlans: PriceSuperPlan[]) => {
            return priceSuperPlan.WaterKindId === waterKindId && priceSuperPlan.WaterRateItemId === waterRateItemId;
        });
    }

}