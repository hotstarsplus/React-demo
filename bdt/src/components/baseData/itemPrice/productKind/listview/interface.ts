import { BusinessTypeDoMainStore } from "../../../system/businessType/doMainStore";
import { ProductKindUiStore } from "../uiStore";



export interface IProductKindListViewProps{

    ProductKindUiStore?:ProductKindUiStore;

    GlobalBusinesstypeStore?: BusinessTypeDoMainStore;

}