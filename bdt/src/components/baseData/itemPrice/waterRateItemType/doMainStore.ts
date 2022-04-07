import { message } from 'antd';
import { action, observable } from 'mobx';
import {  requestJson } from 'orid';
import { WaterRateItemType } from './entity';


/**
 * 水费项目类型action.为WaterRateItemTypeView所使用
 */
export class WaterRateItemTypeDomainStore {

    /**
     * 项目类型集合
     */
    @observable
    public list: WaterRateItemType[];

    /**
     * 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容。
     */
    @observable
    public currentEditItem: WaterRateItemType;

    /**
     * 是否正在加载数据
     */
    @observable
    public isLoading: boolean;

    constructor() {
        this.list = new Array<WaterRateItemType>();
        this.currentEditItem = new WaterRateItemType();
        this.isLoading = true;
        this.selectItem = this.selectItem.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.loadData=this.loadData.bind(this);
        this.selectRow=this.selectRow.bind(this);
        this.validate=this.validate.bind(this);
        this.getWaterRateItemType=this.getWaterRateItemType.bind(this);
        this.getIndex=this.getIndex.bind(this);
    }
    /**
     * 新增项目
     * @param {WaterRateItemType} item 项目
     */
    @action
    public async add(item: WaterRateItemType) {
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }

            const res = await requestJson("/api/bdt/itemprice/WaterRateItemTypeAdd",{method:"POST",body:JSON.stringify(item)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            const data = res.data as WaterRateItemType;
            item.ItemTypeId = data.ItemTypeId;
            this.list.push(item);
            message.success("新增成功");
            this.isLoading = false;
        }catch(error){
            console.log(error);
            this.isLoading = false;
    }
}

    /**
     * 加载数据
     * @param {(list: WaterRateItemType[])=>void} callBack 加载完成后的回调函数
     */
    @action
    public async loadData(fn?: (list: WaterRateItemType[]) => void) {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.list = new Array<WaterRateItemType>();

            const res = await requestJson('/api/bdt/itemprice/WaterRateItemType', {
                method: "GET"
            });

            if (res.rtnCode !== 0) {
                console.log(res.rtnMsg);
                return;
            }

            const datas = res.data as WaterRateItemType[];
            this.list.push(...datas);
            this.isLoading = false;
            if (fn) {
                fn(this.list);
            }
        }
        catch (error) {
            console.log(error);
        }
        this.currentEditItem = new WaterRateItemType();
    }

    /**
     * 删除一个项目
     * @param {number} id 项目id
     */
    @action
    public async remove(id: string){
        try{
            const index = this.getIndex(id);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/itemprice/WaterRateItemTypeDelete",{method:"DELETE",body:JSON.stringify(id)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            message.success("删除成功");
            this.list.splice(index,1);
            this.isLoading = false;

        }catch(error){
            console.log(error);
            this.isLoading = false;
        }
    }

    /**
     * 设置指定Id的项目为当前编辑项目
     * @param {number} id 项目的Id
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public selectItem(id: string): boolean {
        const item = this.getWaterRateItemType(id);
        if (!item || item === null) {
            return false;
        }

        this.currentEditItem = item;


        // this.currentEditItem.ItemTypeId = item.ItemTypeId;
        // this.currentEditItem.ItemTypeName = item.ItemTypeName;
        return true;
    }

    /**
     * 更新一个项目
     * @param {WaterRateItemType} item 项目
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public async update(item: WaterRateItemType) {
        try{
            const index = this.getIndex(item.ItemTypeId);
            if(index<0){
                return;
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/itemprice/WaterRateItemTypeUpdate",{method:"PUT",body:JSON.stringify(item)});
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                message.error(res.rtnMsg);
                this.isLoading = false;
            }
            message.success("保存成功");
            this.list[index] = item;
            this.isLoading = false;
        }catch(error){
            console.log(error);
            this.isLoading = false;
        }
    }

    public validate(values: WaterRateItemType): string | undefined {

        return undefined;
    }

    /**
     * 当前选择行
     * @param autoId 
     */
    @action
    public selectRow(Id:string):boolean{
        const row = this.getWaterRateItemType(Id);
        if(!row || row === null){
            return false;
        }
        this.currentEditItem = row;
        return true;

    }
    /**
     * 查找指定的id的项目
     * 
     * @param {number} id 
     * @returns {WaterRateItemType | null} 水费项目或空
     */
    private getWaterRateItemType(id: string): WaterRateItemType | null {

        try {
            const index = this.getIndex(id);
            return index < 0 ? null :this.list[index];
            
        } catch (error) {
            console.log("获取当前编辑实体异常:"+error);
            return null;
        }
    }

    /**
     * 查找指定id的项目的在集合中的索引
     * 
     * @param {number} id 项目的id
     * @returns {number} 项目的索引
     */
    private getIndex(id: string){
        return this.list.findIndex((item: WaterRateItemType, index: number, items: WaterRateItemType[]) => {
            return item.ItemTypeId === id;
        });
    }

}
