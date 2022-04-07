import appPrintStore from './baseData/appPrintTemplate/stores';
import CalcFeeStore from './baseData/calcFee/stores';
import itemPriceStores from './baseData/itemPrice/stores';
import MeterStore from './baseData/meter/stores';
import RegionStore from './baseData/region/stores';
import SystemStore from './baseData/system/stores';
import UserStore from './baseData/user/stores';
import sysParamStores from './sysParam/store';

interface IBDTStoreType {
    appPrintStore:typeof appPrintStore
    CalcFeeStore: typeof CalcFeeStore;
    MeterStore: typeof MeterStore;
    RegionStore:typeof RegionStore;
    SystemStore:typeof SystemStore;
    UserStore:typeof UserStore;
    itemPriceStores : typeof itemPriceStores;
    sysParamStores:typeof sysParamStores
}

export const BDTStore: IBDTStoreType = {
    appPrintStore,
    CalcFeeStore,
    MeterStore,
    RegionStore,
    SystemStore,
    UserStore,
    itemPriceStores,
    sysParamStores,
}