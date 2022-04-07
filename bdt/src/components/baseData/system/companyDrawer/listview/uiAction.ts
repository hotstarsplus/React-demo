import { message } from "antd";
import { action, observable } from "mobx";
import { OridStores } from "orid";
import { CompanyInvoice } from "../entity";
import { ICompanyDrawerListViewProps } from "./interface";





export class CompanyDrawerListViewUiAction{

    @observable
    public ShowCompanyModal:boolean;

    @observable
    public ShowUserModal:boolean;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";

    private props:ICompanyDrawerListViewProps;

    private cpOperationType:"add"|"edit";


    constructor(props:ICompanyDrawerListViewProps){
        this.props = props;
        this.LoadData = this.LoadData.bind(this);
        this.ShowCompanyModal = false;
        this.ShowUserModal = false;
        this.OnAddUser = this.OnAddUser.bind(this);
        this.OnCancelCompanyModal = this.OnCancelCompanyModal.bind(this);
        this.OnEditCompany = this.OnEditCompany.bind(this);
        this.SaveCompany = this.SaveCompany.bind(this);
        this.OnAddCompany = this.OnAddCompany.bind(this);
        this.SaveUser = this.SaveUser.bind(this);
        this.OnCancelUserModal = this.OnCancelUserModal.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
    }
    @action
    public selectedContent(value:any){
        this.props.GlobalCompanyDrawerDomainStore!.Name=value
        const that=this
        getName(this.props.GlobalCompanyDrawerDomainStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.props.GlobalCompanyDrawerDomainStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('企业名称:',this.props.GlobalCompanyDrawerDomainStore!.CompanyName)
    }

    @action("加载数据")
    public LoadData(){
        this.props.GlobalCompanyDrawerDomainStore!.LoadData();
        this.props.GlobalCompanyDrawerDomainStore!.LoadCpDept();
    }

    @action("添加用户")
    public OnAddUser(id:string){
        this.ShowUserModal = true;
        this.props.GlobalCompanyDrawerDomainStore!.CompanyId = id;
    }

    @action("新增企业信息")
    public OnAddCompany(){
        console.log("cpCode:",this.props.GlobalCompanyDrawerDomainStore!.CompanyName);
        console.log("OridStores:",OridStores.authStore.currentOperator);
          // 当前组织是否启用多组织
        if(OridStores.authStore.currentOperator.IsMultiOrganization){
            /** 主组织cpcode */
            let mainOrganizationCode = "";

            OridStores.authStore.currentOperator.OrganizationCodes.forEach((item:any)=>{
                if(item.FatherCode===""){mainOrganizationCode = item.CpCode}
            })
            // 当前组织为子组织时
            if(mainOrganizationCode!==OridStores.authStore.currentOperator.CpCode){
                if(OridStores.authStore.currentOperator.CpCode!==this.props.GlobalCompanyDrawerDomainStore!.CompanyName){
                    message.error("内部组织不能其他组织新增企业信息!")
                    return;
                }
            }
        }
        this.modaltitle = "新增企业信息";
        this.ShowCompanyModal = true;
        this.cpOperationType = "add";
        this.props.GlobalCompanyDrawerDomainStore!.CurrentEditItem = new CompanyInvoice();
    }

    @action("编辑企业信息")
    public OnEditCompany(){
        this.modaltitle = "编辑企业信息";
        this.ShowCompanyModal = true;
        this.cpOperationType = "edit";
    }

    @action("取消企业信息弹窗")
    public OnCancelCompanyModal(){  
        this.ShowCompanyModal = false;
    }

    @action("保存数据")
    public async SaveCompany(formData:any){

       if (this.cpOperationType==="add") {
           const res = await this.props.GlobalCompanyDrawerDomainStore!.AddCompanyInfo(formData);

           if (res.rtnCode===0) {
               message.success("新增成功");
               this.ShowCompanyModal = false;
           }else{
               message.error(res.rtnMsg);
           }

       }else{
        const res = await this.props.GlobalCompanyDrawerDomainStore!.UpdateCompanyInfo(formData);

        if (res.rtnCode===0) {
            message.success("更新成功");
            this.ShowCompanyModal = false;
        }else{
            message.error(res.rtnMsg);
        }
       }

    }


    public async SaveUser(){
        
        if (this.props.GlobalCompanyDrawerDomainStore!.CompanyId==="") {
            message.error("未选中企业信息");
            this.ShowUserModal = false;
            return;
        }

        if (this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList.length===0) {
            message.error("暂无需要保存的数据");
            this.ShowUserModal = false;
            return;
        }

        const res = await this.props.GlobalCompanyDrawerDomainStore!.SaveCompanyDrawer(this.props.GlobalCompanyDrawerDomainStore!.CompanyId);

        if (res.rtnCode===0) {
            message.success("更新成功");
            this.ShowUserModal = false;
            this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList=[];
        }else{
            message.error(res.rtnMsg);
        }

    }


    @action("取消用户弹窗")
    public OnCancelUserModal(){  
        this.ShowUserModal = false;
        this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList = [];
    }

}