import {  FormComponentProps } from "antd/lib/form";
import { ProductKindUiStore } from "../uiStore";




export interface IProductKindFormProps extends FormComponentProps{

    ProductKindUiStore:ProductKindUiStore;

    fatherIdIsCanEdit:boolean;

    getValidate:(validate:()=>{ formdata:any,isValidate:boolean})=>void;

}