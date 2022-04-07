import { CalcFeeTypeUiStore } from "../calcFee/calcFeeType/uiStore";
import calcFeeStores from "../calcFee/stores";
import { BusinessTypeDoMainStore } from "../system/businessType/doMainStore";
import { businesstypeStores } from "../system/businessType/stores";
import { PriceLadderUiStore } from "./priceLadder/uiStore";
import { WaterProductDoMainStore } from "./product/domainStore";
// import { WaterProductionDoMainStore } from "./production/doMainStore";
import { ProductItemUiStore } from "./productItem/uiStore";
import { ProductKindUiStore } from "./productKind/uiStore";
import { ProductTypeDomainStore } from "./productType/domainStore";
import { SuperPlanPriceUiStore } from "./superPlanPrice/uiStore";
import { WaterFeeItemDomainStore } from "./waterFeeItem/domainStore";
interface IItemPriceProps{
        GlobalCalcFeeTypeStore:  CalcFeeTypeUiStore,
        GlobalWaterFeeItemStore: WaterFeeItemDomainStore,
        ProductKindUiStore:ProductKindUiStore,
        GlobalProductTypeStore: ProductTypeDomainStore;
        // GlobalWaterProductionStore: WaterProductionDoMainStore;
        GlobalSuperPlanPriceUiStore:SuperPlanPriceUiStore;
        GlobalLadderPriceUiStore:PriceLadderUiStore;
        GlobalBusinesstypeStore:BusinessTypeDoMainStore;
        GlobalProductItemStore:ProductItemUiStore;
        GlobalWaterProductStore:WaterProductDoMainStore;
}



const itemPriceStores:IItemPriceProps = {
    GlobalWaterFeeItemStore:new WaterFeeItemDomainStore(),
    ProductKindUiStore:new ProductKindUiStore(),
    GlobalProductTypeStore: new ProductTypeDomainStore(),
    // GlobalWaterProductionStore : new WaterProductionDoMainStore(),
    GlobalSuperPlanPriceUiStore:new SuperPlanPriceUiStore(),
    GlobalLadderPriceUiStore:new PriceLadderUiStore(),
    GlobalProductItemStore:new ProductItemUiStore(),
    GlobalWaterProductStore:new WaterProductDoMainStore(),
    ...calcFeeStores,
    ...businesstypeStores
}

export default itemPriceStores;