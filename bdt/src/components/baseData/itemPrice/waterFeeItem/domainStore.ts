import { action, observable } from 'mobx';
import { IResponseJsonResult, requestJson } from 'orid';
import { WaterFeeItem } from './entity';


/**
 * 水费项目Store.为WaterRateItemView所使用
 */
export class WaterFeeItemDomainStore {

    /**
     * 项目集合
     */
    @observable
    public list: WaterFeeItem[];

    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled:boolean;

    /**
     * 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容。
     */
    @observable
    public currentEditItem: WaterFeeItem;

    @observable
    public isLoading: boolean = true;


    constructor() {

        this.list = Array<WaterFeeItem>();

        this.currentEditItem = new WaterFeeItem();

        this.selectItem = this.selectItem.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.loadData=this.loadData.bind(this);
        this.selectRow=this.selectRow.bind(this);
        this.validate=this.validate.bind(this);
        this.getWaterRateItem=this.getWaterRateItem.bind(this);
        this.getIndex=this.getIndex.bind(this);
    }

    /**
     * 新增项目
     * @param {WaterFeeItem} item 项目
     */
    @action
    public async add(item: WaterFeeItem):Promise<IResponseJsonResult> {
        try{
            if(!this.isLoading){
                this.isLoading = true;
            }

            const res = await requestJson("/api/bdt/WaterFeeItem/Add",{
                method:"POST",
                body:JSON.stringify(item),
                headers:{"content-type": "application/json"}
            });
            if(res.rtnCode!==0){
                console.log(res.rtnMsg);
                this.isLoading = false;
                return res;
            }
            item.WaterFeeItemId = res.data!.toString();
            this.list.push(item);
            this.isLoading = false;

            return res;
        }catch(error){
            console.log(error);
            this.isLoading = false;
            return {rtnCode:1,rtnMsg:error.toString()};
    }}



    /**
     * 加载数据
     * @param {(list:WaterFeeItem[]) => void} fn 
     */
    @action
    public async loadData(fn?: (list: WaterFeeItem[]) => void) {
        try {
            if (!this.isLoading) {
                this.isLoading = true;
            }
            this.list = new Array<WaterFeeItem>();

            const res = await requestJson('/api/bdt/WaterFeeItem/List', {
                method: "GET"
            });

            if (res.rtnCode !== 0) {
                console.log(res.rtnMsg);
                return;
            }
            const datas = res.data as WaterFeeItem[];
            this.list.push(...datas);
            this.isLoading = false;
            if (fn) {
                fn(this.list);
            }
        }
        catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }

    /**
     * 删除一个项目
     * @param {string} id 项目id
     */
    @action
    public async remove(id: string):Promise<IResponseJsonResult> {
        try{
            const index = this.getIndex(id);
            if(index<0){
                return {rtnCode:1,rtnMsg:"未找到数据"};
            }
            if(!this.isLoading){
                this.isLoading = true;
            }
            const res = await requestJson("/api/bdt/WaterFeeItem/Delete/"+id,
            {
                method:"POST",
                body:JSON.stringify(id),
                headers:{"content-type": "application/json"}
        
            });
            if(res.rtnCode!==0){
                this.isLoading = false;
                return res;
            }
            this.list.splice(index,1);
            this.isLoading = false;
            return res;
        }catch(error){
            console.log(error);
            this.isLoading = false;
            return {rtnCode:1,rtnMsg:error};
        }
    }

    /**
     * 设置指定Id的项目为当前编辑项目
     * @param {string} id 项目的Id
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public selectItem(id: string): boolean {
        const item = this.getWaterRateItem(id);
        if (!item || item === null) {
            return false;
        }
        this.currentEditItem = item;
        return true;
    }

    /**
     * 更新一个项目
     * @param {WaterFeeItem} item 项目
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public async update(item: WaterFeeItem):Promise<IResponseJsonResult> {
        try{
            const index = this.getIndex(item.WaterFeeItemId);
            if(index<0){
                return {rtnCode:1,rtnMsg:"水费项目不在表格内"};
            }
            if(!this.isLoading){
                this.isLoading = true;
            }

            if (item.WaterFeeItemName===this.currentEditItem.WaterFeeItemName) {
                this.isLoading = false;
                return {rtnCode:0,rtnMsg:"更新成功"};
            }

            const res = await requestJson("/api/bdt/WaterFeeItem/Update",
                {
                    method:"POST",
                    body:JSON.stringify(item),
                    headers:{"content-type": "application/json"}
                }
            );
            if(res.rtnCode!==0){
                console.log("保存水费项目时出错："+res.rtnMsg);
                this.isLoading = false;
                return res;
            }
            this.list[index] = item;
            this.isLoading = false;
            return res;
        }catch(error){
            console.log(error);
            this.isLoading = false;
            return {rtnCode:1,rtnMsg:error.toString()};
        }
    }

    public validate(values: WaterFeeItem): string | undefined {

        return undefined;
    }




    /**
     * 当前选择行
     * @param autoId 
     */
    @action
    public selectRow(Id:string):boolean{
        const row = this.getWaterRateItem(Id);
        if(!row || row === null){
            return false;
        }
        this.currentEditItem = row;
        return true;

    }



    /**
     * 根据Id找到对应的实体
     * @param Id 
     */
    private getWaterRateItem(Id:string): WaterFeeItem | null
    {
        try {
            const index = this.getIndex(Id);
            return index < 0 ? null :this.list[index];
            
        } catch (error) {
            console.log("获取当前编辑实体异常:"+error);
            return null;
        }
    }
    /**
     * 查找指定id的项目在集合中的索引
     * @param Id 项目的id
     */
    private getIndex(Id:string){
        return this.list.findIndex((waterRateItem:WaterFeeItem,index:number,WaterRateItems:WaterFeeItem[]) => {
            return waterRateItem.WaterFeeItemId === Id;
        })
    }


}
