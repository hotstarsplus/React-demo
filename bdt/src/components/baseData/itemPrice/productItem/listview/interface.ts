import { BusinessTypeDoMainStore } from '../../../system/businessType/doMainStore';
import {ProductItemUiStore} from '../uiStore';


export interface IProductItemViewProps{
    GlobalProductItemStore?:ProductItemUiStore
    GlobalBusinesstypeStore?: BusinessTypeDoMainStore;
}
    