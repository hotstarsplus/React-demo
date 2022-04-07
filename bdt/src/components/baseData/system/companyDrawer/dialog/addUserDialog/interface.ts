import { CompanyDrawerDomainStore } from "../../domainStore";



export interface IUserDialogProps {

    GlobalCompanyDrawerDomainStore?:CompanyDrawerDomainStore;


    visible?:boolean;


    onOk?:()=>void;

    onCancel?:()=>void;

}