import { CompanyDrawerDomainStore } from "../domainStore";



export interface ICompanyDrawerTableProps{

    GlobalCompanyDrawerDomainStore?:CompanyDrawerDomainStore;

    /**
     * 新增用户
     */
    onAddUser?:(id:string)=>void;

    /**
     * 编辑企业信息
     */
    onEditCompany?:()=>void;

}