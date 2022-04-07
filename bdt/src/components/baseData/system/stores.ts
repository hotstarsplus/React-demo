import { ControlTypeDomainStore } from './control/controlType/domianStore'
import { HeatStateDomainStore } from './heat/heatState/domainStore';
import { PayBankUiStore } from './payBank/uiStore';
import { PayTypeUiStore } from './payType/uiStore'



const stores = {
    
    GlobalPayBankStore: new PayBankUiStore(),
    GlobalPayTypeStore: new PayTypeUiStore(),
    GlobalHeatStateStore:new HeatStateDomainStore(),
    GlobalControlTypeStore:new ControlTypeDomainStore(),

}

export default stores;