// import { CalcFeeStateDoMainStore } from "./calcFeeState/domainStore";
import {CalcFeeTypeUiStore} from './calcFeeType/uiStore';

const calcFeeStores = {
   // GlobalCalcFeeStateStore:new CalcFeeStateDoMainStore(),  
    GlobalCalcFeeTypeStore:new CalcFeeTypeUiStore(),
}

export default calcFeeStores;