import {message} from "antd"
import { action,observable } from "mobx";
import { requestJson } from "orid";
import { PriceRepireMeter } from "./entity";

export class PriceRepireDoMainStore{

    /**
     * 页面内数据的集合
     */
    @observable
    public list:PriceRepireMeter[];

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading:boolean = false;

    /**
     * 当前编辑行
     */
    @observable
    public currentEditRow:PriceRepireMeter;

    /**
     * 构造方法
     */
    constructor(){
        this.list = new Array<PriceRepireMeter>();
        this.currentEditRow = new PriceRepireMeter();

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getPriceRepireMeter = this.getPriceRepireMeter.bind(this);
    }


    /**
     * 加载数据
     * @param callBack 
     */
    public async loadData(callBack?:(list:PriceRepireMeter[]) => void){

        try{
            if(!this.isLoading){
                this.isLoading = true;
            }
            this.list = new Array<PriceRepireMeter>();
            const res = await requestJson("/api/bdt/itemPrice/PriceRepireMeter",{method:"GET"});
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                console.log(res.rtnMsg);
                this.isLoading = false;
                return;
            }
            const datas = res.data as PriceRepireMeter[];
            console.log(datas);
            this.list.push(...datas);
            this.isLoading = false;
            if(callBack){
                callBack(this.list);
            }

        }catch(error){
            message.error(error);
            console.log(error);
            this.isLoading = false;
        }
    }

    /**
     * 新增一条数据
     * @param priceRepireMeter 校表维修费新增实体
     */
    @action
    public async add(priceRepireMeter:PriceRepireMeter){
        try{
            const res = await requestJson("/api/bdt/itemPrice/PriceRepireMeterAdd",{method:"POST",body:JSON.stringify(priceRepireMeter)});
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                console.log(res.rtnMsg);
                return;
            }
            const data = res.data as PriceRepireMeter
            priceRepireMeter.AutoId = data.AutoId;
            this.list.push(priceRepireMeter);
        }catch(error){
            message.error(error);
            console.log(error);
            
        }
    }

    /**
     * 删除一条数据
     * @param autoId 
     */
    @action
    public async remove(meterCaliberId:string){
        try{
            const index = this.getIndex(meterCaliberId);
            if(index<0){
                return;
            }
            const res = await requestJson("/api/bdt/itemPrice/PriceRepireMeterDelete",{method:"DELETE",body:JSON.stringify(meterCaliberId)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                return;
            }
            this.list.splice(index,1);
            console.log("删除成功");
            message.success("删除成功");
        }catch(error){
            message.error(error);
            console.log(error);
        }
    }

    /**
     * 保存更新
     * @param priceRepireMeter 需要保存的校表维修费实体
     */
    @action
    public async update(priceRepireMeter:PriceRepireMeter){
        try{
            const index = this.getIndex(priceRepireMeter.MeterCaliberId);
            if(index<0){
                return;
            }
            const res = await requestJson("/api/bdt/itemPrice/PriceRepireMeterUpdate",{method:"PUT",body:JSON.stringify(priceRepireMeter)});
            if(res.rtnCode!==0){
                console.log("保存失败："+res.rtnMsg);
                message.error(res.rtnMsg);
                return;
            }
            this.list[index] = priceRepireMeter;
            console.log("保存成功");
            message.success("保存成功");
        }catch(error){
            console.log(error);
            message.error(error);
        }
    }

    /**
     * 设置指定id的类型未当前编辑行
     * @param id 
     */
    @action
    public selectRow(meterCaliberId:string):boolean{
        const row = this.getPriceRepireMeter(meterCaliberId);
        if(!row || row === null){
            return false;
        }
        this.currentEditRow = row;
        return true;
    }


    /**
     * 验证数据
     * @param values 
     */
    public validate(values: PriceRepireMeter): string | undefined {

        return undefined;
    }
    /**
     * 查找指定id的项目的在集合中的索引
     * @param id {string} id 项目的id
     * @returns {number} 项目的索引
     */
    private getIndex(meterCaliberId: string): number {
        return this.list.findIndex((model: PriceRepireMeter, index: number, models: PriceRepireMeter[]) => {
            return model.MeterCaliberId === meterCaliberId;
        });
    }


    /**
     * 查找指定的id的项目
     * 
     * @param {string} id 
     * @returns {PriceRepireMeter | null} 校表维修费实体或空
     */
    private getPriceRepireMeter(meterCaliberId: string): PriceRepireMeter | null {
        const ix = this.getIndex(meterCaliberId);

        return ix < 0
            ? null
            : this.list[ix];
    }

}