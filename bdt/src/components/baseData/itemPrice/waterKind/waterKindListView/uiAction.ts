import { message } from "antd";
import { action ,observable} from "mobx";
import { WaterKindDoMainStore } from "../doMainStore";
import { WaterKind } from "../entity";
import { IWaterKindListViewProps } from "./interface";




export class WaterKindLisViewUiAction{


    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal:boolean;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";


    /**
     * 当前操作类型
     */
    public opearatorType:"none"|"add"|"edit";

    private domainStore:WaterKindDoMainStore;



    /**
     * 构造
     * @param props 
     */
    constructor(props:IWaterKindListViewProps){

        this.domainStore = props.GlobalWaterKindStore!;

        this.addbtn = this.addbtn.bind(this);

        this.adda = this.adda.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

    }
    
    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action
    public addbtn(){
        this.modaltitle = "新增用水性质"

        this.isVisiableModal = true;

        this.domainStore.CurrentEditWaterKind = new WaterKind();

        this.domainStore.CurrentEditWaterKind.FatherId = "00"

        this.domainStore.CurrentEditWaterKind.ColligationPrice = 0;

        this.opearatorType="add";

        this.domainStore.SelectorDisabled = false;

    }
    
    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action
    public adda(model:WaterKind){
        this.modaltitle = "新增用水性质"
        this.isVisiableModal = true;

        this.opearatorType = "add";
        
        this.domainStore.CurrentEditWaterKind = new WaterKind();

        this.domainStore.CurrentEditWaterKind.FatherId = model.WaterKindId;

        this.domainStore.SelectorDisabled = true;

    }

    /**
     * 编辑
     */
    @action
    public edit(){
        this.modaltitle = "编辑用水性质"
        this.isVisiableModal = true;

        this.opearatorType = "edit";  

        this.domainStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action
    public cancel(){

        this.isVisiableModal = false;

        this.opearatorType = "none";


    }

   /**
    * 保存
    * @param model 实体类
    */
    @action
    public async save(model:WaterKind){

        if (this.opearatorType==="add") {
           const res = await this.domainStore.AddWaterKind(model);

           if (res.rtnCode===0) {
            message.success("保存成功");
            this.isVisiableModal = false;
           }else{
            message.error(res.rtnMsg);
           }

        }else if (this.opearatorType==="edit") {
            const res = await this.domainStore.UpdateWaterKind(model);

            if (res.rtnCode===0) {
                message.success("更新成功");
                this.isVisiableModal = false;
               }else{
                message.error(res.rtnMsg);
               }
        }
        
      
    }


}