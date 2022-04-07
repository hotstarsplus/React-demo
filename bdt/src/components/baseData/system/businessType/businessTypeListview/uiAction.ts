import { message } from 'antd';
import { action, observable } from 'mobx';
import { BusinessTypeDoMainStore } from '../doMainStore';
import { BusinessType } from '../entity';

/**
 * 业务类别列表UIaction
 */
export class BusinessTypeViewUiAction {

    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 当前编辑状态
     */ 
    public opearatorType : 'edit';


    /**
     * 领域action
     */
    private domainStore: BusinessTypeDoMainStore;

    /**
     * 
     * @param domainStore 领域Store
     */
    constructor(domainStore: BusinessTypeDoMainStore) {
        this.domainStore = domainStore;

        this.cancelAddOrEdit = this.cancelAddOrEdit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
    }
    /** 切换企业名称 */
    @action
    public selectedContent(value:any){
        this.domainStore.Name=value
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
        console.log('企业名称切换:',this.domainStore.CompanyName)
    }

    /**
     * 点击编辑按钮的回调方法
     * @param item 
     */
    @action
    public onEditClick() {
        this.isVisiableModal = true;
        this.opearatorType = 'edit';
    }


    /**
     * 取消新增或编辑
     */
    @action
    public cancelAddOrEdit() {
        this.isVisiableModal = false;
    };



    /**
     * 保存
     * @param  item 当前待编辑的项目
     */
    @action
    public async saveClick(item: BusinessType) {
         if (this.opearatorType === 'edit') {
            const res=await  this.domainStore.Update(item);
        
            if (res.rtnCode===0) {
                message.success("保存成功");
            }else{
                message.error(res.rtnMsg);
            }
        }


        this.isVisiableModal = false;
    }

    
}