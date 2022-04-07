import { action ,observable} from "mobx";
import { DeviceDetailField } from "../DeviceDetailField/entity";
import { DeviceTypeDoMainStore } from "./domainStore";
import { DeviceType } from "./entity";
import { IDeviceTypeListViewProps } from "./interface";


export class DeviceTypeListViewUiAction{


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

    public props:IDeviceTypeListViewProps;
    /**
     * 当前操作类型
     */
    public opearatorType:"none"|"add"|"edit";

    private domainStore:DeviceTypeDoMainStore;

    /**
     * 构造
     * @param props 
     */
    constructor(props:IDeviceTypeListViewProps){

        this.domainStore = props.GlobalDeviceTypeStore!;

        this.addbtn = this.addbtn.bind(this);

        this.adda = this.adda.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.ChangeCode = this.ChangeCode.bind(this)

        this.ChangeTypeName = this.ChangeTypeName.bind(this)

        this.selectedContent = this.selectedContent.bind(this)

        this.props=props;

    }
    /**
     * 输入的类型编码
     * @param value 
     */
    @action
    public ChangeCode(e:any){
        this.props.GlobalDeviceTypeStore!.InputCode=e.target.value
        console.log('输入编码:',this.props.GlobalDeviceTypeStore!.InputCode)
    }


    /**
     * 输入的类型名称
     * @param value 
     */
    @action
    public ChangeTypeName(e:any){
        this.props.GlobalDeviceTypeStore!.InputTypeName=e.target.value
        console.log('输入水表类型名称:',this.props.GlobalDeviceTypeStore!.InputTypeName)
    }


    /**
     * 企业名称选择
     */
    @action
    public selectedContent(value:any){
        this.props.GlobalDeviceTypeStore!.Name=value
        const that=this
        getName(this.props.GlobalDeviceTypeStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.props.GlobalDeviceTypeStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('企业名称:',this.props.GlobalDeviceTypeStore!.CompanyName)
    }



    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action
    public async addbtn(){
        this.modaltitle = "新增类型"
        this.domainStore.currentEditItem = new DeviceType();

        this.domainStore.currentEditItem.FatherId = "";

        this.domainStore.tmpAttr = new Array<DeviceDetailField>();

        this.domainStore.selectCategoryId = "";

        this.opearatorType="add";

        this.domainStore.SelectorDisabled = false;

        this.isVisiableModal = true;

        this.domainStore.IsFatherVisiable = false;

        this.domainStore.IsCategoryAble = false;

        this.domainStore.isShowEditDialog = true;

    }
    
    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action
    public adda(model:DeviceType){
        this.modaltitle = "新增类型"

        this.isVisiableModal = true;

        this.opearatorType = "add";
        
        this.domainStore.currentEditItem = new DeviceType();

        this.domainStore.currentEditItem.FatherId = model.DeviceTypeId;

        this.domainStore.currentEditItem.CategoryId = model.CategoryId;

        this.domainStore.selectCategoryName = model.CategoryName;

        this.domainStore.tmpAttr = new Array<DeviceDetailField>();

        this.domainStore.SelectorDisabled = true;

        
        this.domainStore.IsFatherVisiable = true;

        this.domainStore.IsCategoryAble = true;

        this.domainStore.isShowEditDialog = true;

    }

    /**
     * 编辑
     */
    @action
    public edit(){
        this.modaltitle = "编辑类型"

        this.isVisiableModal = true;

        this.opearatorType = "edit";

        console.log(this.domainStore.currentEditItem);


        this.domainStore.SelectorDisabled = true;

        
        this.domainStore.IsFatherVisiable = true;

        this.domainStore.IsCategoryAble = true;

        this.domainStore.isShowEditDialog = true;


    }

    /**
     * 取消
     */
    @action
    public cancel(){

        this.isVisiableModal = false;

        this.isVisiableModal = false;

        this.opearatorType = "none";

        this.domainStore.isShowEditDialog = false;

    }


   /**
    * 保存
    * @param model 实体类
    */
    @action
    public save(model:DeviceType){
        if (this.opearatorType==="add") {
            const index = model.FatherId.indexOf("_");
            if(index>0){
                model.FatherId=model.FatherId.substring(0,index);
            }
            console.log("model is "+JSON.stringify(model));

            this.domainStore.AddDeviceType(model);
        }else if (this.opearatorType==="edit") {
            const index = model.FatherId.indexOf("_");
            if(index>0){
                model.FatherId=model.FatherId.substring(index+1,model.FatherId.length);
            }
            this.domainStore.UpdateDeviceType(model);
        }
        //  this.isVisiableModal = false;
        // console.log("保存成功")
        // message.success("保存成功");
    }


}