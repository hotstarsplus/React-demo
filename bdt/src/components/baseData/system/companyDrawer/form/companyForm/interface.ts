import { FormComponentProps } from "antd/lib/form";
import { CompanyDrawerDomainStore } from "../../domainStore";




export interface ICompanyFormProps extends FormComponentProps {

    GlobalCompanyDrawerDomainStore:CompanyDrawerDomainStore;

    validate:(callback:()=>{formData: any,isValidated: boolean})=>void;

}