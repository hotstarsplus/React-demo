import { message } from "antd";
import { action } from "mobx";
import { ICompanyDrawerTableProps } from "./interface";




export class CompanyDrawerTableUiAction{

    private props:ICompanyDrawerTableProps;

    constructor(props:ICompanyDrawerTableProps){
        this.props = props;
        this.OnEdit = this.OnEdit.bind(this);
        this.OnAddUser = this.OnAddUser.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
    }

    @action("编辑")
    public OnEdit(event: React.MouseEvent<HTMLAnchorElement>){
        console.log(event.currentTarget.id);

        const item = this.props.GlobalCompanyDrawerDomainStore!.CompanyInvoiceList.find(x=>x.CompanyId===event.currentTarget.id);

        this.props.GlobalCompanyDrawerDomainStore!.CurrentEditItem = item!;

        this.props.onEditCompany!();

    }


    @action("添加用户")
    public OnAddUser(event: React.MouseEvent<HTMLAnchorElement>){
        console.log("companyId:"+event.currentTarget.id)
        
        this.props.onAddUser!(event.currentTarget.id);
        
    }


    @action("删除")
    public async OnDelete(id:string){

        const res = await this.props.GlobalCompanyDrawerDomainStore!.DeleteCompany(id);

        if (res.rtnCode===0) {
            message.success("删除成功");
        }else{
            message.error(res.rtnMsg);
        }


    }


}