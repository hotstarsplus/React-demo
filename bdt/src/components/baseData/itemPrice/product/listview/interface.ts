import { CalcFeeTypeUiStore } from "../../../calcFee/calcFeeType/uiStore";
import { BusinessTypeDoMainStore } from "../../../system/businessType/doMainStore";
import { ProductKindUiStore } from "../../productKind/uiStore";
import { WaterProductDoMainStore } from "../domainStore";



export interface IWaterProductListViewProps{
        
        GlobalWaterProductStore?:WaterProductDoMainStore;

        ProductKindUiStore?:ProductKindUiStore;

        GlobalBusinesstypeStore?:BusinessTypeDoMainStore;

        GlobalCalcFeeTypeStore?:CalcFeeTypeUiStore;
}