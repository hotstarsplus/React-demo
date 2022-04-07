import { ProductKindUiStore } from "../uiStore";




export interface IProductKindModalProps{


    ProductKindUiStore?:ProductKindUiStore;

    visible?:boolean;

    onCancel?:()=>void;

    onOk?:(data:any)=>void;

    fatherIdIsCanEdit:boolean;

    isEditModalShow?:boolean;

}