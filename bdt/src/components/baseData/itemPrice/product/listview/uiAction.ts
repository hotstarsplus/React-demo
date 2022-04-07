import { message } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { action,observable } from "mobx";
// import { WaterProductDoMainStore } from "../domainStore";
import { WaterProduct } from "../entity";
import { IWaterProductListViewProps } from "./interface";


export class WaterProductListViewUiAction{


    @observable
    public IsVisiableModal:boolean;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle:string = "";

    @observable
    public selectKeys:string[];

    @observable
    public businessTypeId:number;

    private opearatorType:"add"|"edit";

    // private domainStore:WaterProductDoMainStore;

    private props:IWaterProductListViewProps;

    constructor(props:IWaterProductListViewProps){
        this.props = props;
        this.selectKeys=new Array<string>();
        this.Edit = this.Edit.bind(this);
        this.OnTreeSelect = this.OnTreeSelect.bind(this);
        this.OnTableRowSelect = this.OnTableRowSelect.bind(this);
        this.Cancel = this.Cancel.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.InitTable = this.InitTable.bind(this);
        this.OnTableCancelChecked = this.OnTableCancelChecked.bind(this);
        this.businessTypeId=-1;
    }

    /**
     * 编辑
     * @param model 
     */
    @action
    public Edit(model:WaterProduct){
        this.modaltitle = "编辑产品";
        // 是增值税时默认不显示票据类型
        this.props.GlobalWaterProductStore!.IsShowBillType = this.props.GlobalWaterProductStore!.CurrentEditItem.IsAddedTax==="1"?false:true;
        console.log("测试产品_票据id1",this.props.GlobalWaterProductStore!.CurrentEditItem.BillTypeId)
        if(!this.props.GlobalWaterProductStore!.IsShowBillType){
            this.props.GlobalWaterProductStore!.CurrentEditItem.BillTypeId='003'; // 是增值税时，票据类型默认传‘003’，这行代码目的是修改之前的数据
            console.log("测试产品_票据id2",this.props.GlobalWaterProductStore!.CurrentEditItem.BillTypeId)

        }
        this.IsVisiableModal = true;
        this.opearatorType = "edit";
    }

    /**
     * 取消
     */
    @action
    public Cancel(){
        if (this.opearatorType==="add") {
            this.props.GlobalWaterProductStore!.CurrentEditItem.IsDelete='1'
        }

        this.IsVisiableModal = false;
    }

    /**
     * 树节点选中事件
     * @param selectedKeys 
     */
    @action
    public OnTreeSelect(businessTypeId:number,selectedKeys: string[], e: AntTreeNodeSelectedEvent){
        
       //  this.selectKeys=selectedKeys;
        this.businessTypeId=businessTypeId;
        console.log("ee:",e.node.props['data-cpcode']);
        
        const cpCode=e.node.props['data-cpcode'];
        this.props.GlobalCalcFeeTypeStore!.cpCode = cpCode;
        if (e.selected) {
            const waterKindId = selectedKeys[0].split('_')[0];
            const waterKindName = e.selectedNodes![0].props.title!.toString();
            // this.props.GlobalWaterProductStore!.GetBillPrintTempLateByCpCode();
            this.props.GlobalWaterProductStore!.OnWaterKindTreeNodeSearch(waterKindId,waterKindName,businessTypeId,cpCode);                
        }else{
            this.props.GlobalWaterProductStore!.TruncateTable();
        }
        // function getCpCode(list:any,that:any){
        //     list.map((element:any)=>{
        //         if(Number(element.ProductKindId)===Number(selectedKeys[0])){
        //             that.props.GlobalWaterProductStore!.CompanyCode=element.CpCode?element.CpCode:''
        //         }
        //         if(element.ProductKinds&&element.ProductKinds.length){
        //             getCpCodes(element.ProductKinds,that)
        //         }
        //     })
        // }
        // function getCpCodes(list:any,thats:any){
        //     list.map((element:any)=>{
        //         if(Number(element.ProductKindId)===Number(selectedKeys[0])){
        //             thats.props.GlobalWaterProductStore!.CompanyCode=element.CpCode?element.CpCode:''
        //         }
        //         if(element.children&&element.children.length){
        //             getCpCode(element.ProductKinds,thats)
        //         }
        //     })
        // }

      
    }

    @action
    public InitTable(){
        this.props.GlobalWaterProductStore!.TruncateTable();
    }

    /**
     * 表格行选中
     * @param record 
     * @param selected 
     */
    @action
    public OnTableRowSelect(model:WaterProduct){
            this.opearatorType="add";
            this.modaltitle = "新增产品";
            if(!this.props.GlobalWaterProductStore!.SelectedRow(model.ProductItemId)){
                message.error("未找到对应的水费项目");
                return;
            }
            this.props.GlobalWaterProductStore!.CurrentEditItem.IsRandClacFee="0";
            this.props.GlobalWaterProductStore!.CurrentEditItem.IsSystemClacFee="1";
            this.props.GlobalWaterProductStore!.CurrentEditItem.IsDelete='0';
            this.IsVisiableModal = true;
            this.props.GlobalWaterProductStore!.IsShowBillType = false;

    }

    /**
     * 取消选中
     * @param model 
     */
    public async OnTableCancelChecked(model:WaterProduct){

        const res = await this.props.GlobalWaterProductStore!.Delete(model);

        if (res.rtnCode===0) {
            message.success(res.rtnMsg);
        }else{
            message.error(res.rtnMsg);
        }

    }

    /**
     * 保存
     * @param {Product} item 当前待编辑的项目
     */
    public async saveClick(item: WaterProduct) {
        if (this.opearatorType==="add") {
            console.log(11)
            item.BusinessTypeId=this.businessTypeId;
           const res = await this.props.GlobalWaterProductStore!.Add(item);
            // const waterProduct = new WaterProduct();
            // waterProduct.ProductItemId= item.ProductItemId
            // waterProduct.ProductItemName= item.ProductItemName
            // waterProduct.ProductKindId= item.ProductKindId
            // waterProduct.ProductKindName= item.ProductKindName
           res.rtnCode===0?message.success("关联成功"):message.error(res.rtnMsg);
        }else{
            const res = await this.props.GlobalWaterProductStore!.Update(item);
            res.rtnCode===0?message.success("修改成功"):message.error(res.rtnMsg);
        }
      
        this.IsVisiableModal = false;

        console.log(item)

    }

    
}