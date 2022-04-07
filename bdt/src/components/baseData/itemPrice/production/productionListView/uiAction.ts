import { message } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { action,observable } from "mobx";
import { WaterProductionDoMainStore } from "../doMainStore";
import { WaterProduction } from "../entity";
import { IWaterProductionListViewProps } from "./interface";


export class WaterProductionListViewUiAction{


    @observable
    public IsVisiableModal:boolean;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";

    private opearatorType:"add"|"edit";

    private domainStore:WaterProductionDoMainStore;


    constructor(props:IWaterProductionListViewProps){
        this.domainStore = props.GlobalWaterProductionStore!;
        this.Edit = this.Edit.bind(this);
        this.OnTreeSelect = this.OnTreeSelect.bind(this);
        this.OnTableRowSelect = this.OnTableRowSelect.bind(this);
        this.Cancel = this.Cancel.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.InitTable = this.InitTable.bind(this);
        this.OnTableCancelChecked = this.OnTableCancelChecked.bind(this);
    }

    /**
     * 编辑
     * @param model 
     */
    @action
    public Edit(model:WaterProduction){
        this.modaltitle = "编辑产品表"
        this.IsVisiableModal = true;
        this.opearatorType = "edit";
    }

    /**
     * 取消
     */
    @action
    public Cancel(){
        if (this.opearatorType==="add") {
            this.domainStore.CurrentEditItem.IsDelete='1'
        }

        this.IsVisiableModal = false;
    }

    /**
     * 树节点选中事件
     * @param selectedKeys 
     */
    @action
    public OnTreeSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent){
        if (e.selected) {
            const waterKindId = selectedKeys[0];
            const waterKindName = e.selectedNodes![0].props.title!.toString();
            this.domainStore.OnWaterKindTreeNodeSearch(waterKindId,waterKindName);                
        }else{
            this.domainStore.TruncateTable();
        }

      
    }

    @action
    public InitTable(){
        this.domainStore.TruncateTable();
    }

    /**
     * 表格行选中
     * @param record 
     * @param selected 
     */
    @action
    public OnTableRowSelect(model:WaterProduction){
            this.opearatorType="add";
            this.modaltitle = "新增产品表"
            if(!this.domainStore.SelectedRow(model.WaterFeeItemId)){
                message.error("未找到对应的水费项目");
                return;
            }
            this.domainStore.CurrentEditItem.IsRandClacFee="0";
            this.domainStore.CurrentEditItem.IsSystemClacFee="1";
            this.domainStore.CurrentEditItem.IsDelete='0';
            this.IsVisiableModal = true;

    }

    /**
     * 取消选中
     * @param model 
     */
    public async OnTableCancelChecked(model:WaterProduction){

        const res = await this.domainStore.Delete(model);

        if (res.rtnCode===0) {
            message.success(res.rtnMsg);
        }else{
            message.error(res.rtnMsg);
        }

    }

    /**
     * 保存
     * @param {Production} item 当前待编辑的项目
     */
    public async saveClick(item: WaterProduction) {
        if (this.opearatorType==="add") {
           const res = await this.domainStore.Add(item);
           res.rtnCode===0?message.success("关联成功"):message.error(res.rtnMsg);
        }else{
            const res = await this.domainStore.Update(item);
            res.rtnCode===0?message.success("修改成功"):message.error("保存失败");
        }
      
        this.IsVisiableModal = false;

        console.log(item)

    }
    
}