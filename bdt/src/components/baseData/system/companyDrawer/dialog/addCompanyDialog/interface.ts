import { CompanyDrawerDomainStore } from "../../domainStore";




export interface ICompanyDialogProps{

    GlobalCompanyDrawerDomainStore?:CompanyDrawerDomainStore;


    visible?:boolean;

    onCancel?:()=>void;

    onOk?:(formData:any)=>void;
    /**
     * 对话框标题
     */
    title:string;



}