import { message } from "antd";
import { action,observable,  } from "mobx";
import { ProductTypeDomainStore } from "../domainStore";
import { ProductType } from "../entity";




export class ProductTypeListViewUiAction{
    
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public IsVisiableModal:boolean ;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";
    /**
     * 当前编辑或新增状态
     */
    public opearatorType:'none' | 'add' | 'edit';

    public domainStore: ProductTypeDomainStore;

    constructor(store:ProductTypeDomainStore){
        this.domainStore = store;
        this.IsVisiableModal = false;
        this.addbtnClick = this.addbtnClick.bind(this);
        this.cancleAddOrEdit = this.cancleAddOrEdit.bind(this);
        this.editClick = this.editClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
    }
    /**
     * 点击新建按钮的回调函数
     */
    @action("新增")
    public addbtnClick(){
        this.modaltitle = "新增产品类型"
        this.IsVisiableModal = true;
        this.domainStore.CurrentEditEntity = new ProductType();
        this.opearatorType = 'add';
        this.domainStore.SelectorDisabled = false;
    }

    /**
     * 编辑
     */
    @action
    public selectedContent=(value:any)=>{
        this.domainStore!.Name=value
        const that=this
        getName(this.domainStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.domainStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('value',this.domainStore!.CompanyName)
    }
    @action("编辑")
    public editClick(){
        this.modaltitle = "编辑产品类型"
        this.IsVisiableModal = true;
        this.opearatorType = 'edit';
        this.domainStore.SelectorDisabled = true;
    }

    /**
     * 点击取消按钮
     */
    @action("取消")
    public cancleAddOrEdit(){
        this.IsVisiableModal = false;
    }

    /**
     * 保存
     * @param productType 当前待编辑的项目
     */
    public async saveClick(productType:ProductType){
        if(this.opearatorType === 'add'){
         const res = await  this.domainStore.Add(productType);
        if(res){
            message.success("新增成功");
        }else{
            message.error("新增失败");
        }

        }else if(this.opearatorType === "edit"){
          const res = await this.domainStore.Update(productType);
          if(res){
            message.success("修改成功");
        }else{
            message.error("修改失败");
        }
        }

        this.IsVisiableModal = false;
    }


}