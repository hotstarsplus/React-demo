import { FormComponentProps } from "antd/lib/form";
import { ProductTypeDomainStore } from "../domainStore";
import { ProductTypeFormUiAction } from "./uiAction";


export interface IProductTypeFormProps extends FormComponentProps{

    store:ProductTypeDomainStore;

    getUiAction:(action:ProductTypeFormUiAction)=>void;

}