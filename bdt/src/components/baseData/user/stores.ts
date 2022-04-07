import { CardTypeUiStore } from "./cardType/uiStore";
// import { CardTypeCopyDateDomainStore } from './cardTypeCopyDate/domainStore';
// import { CardTypeLateFeeDoMainStore } from "./cardTypeLateFee/domainStore";
// import { CustomerStateDomainStore } from "./customerState/domainStore";
// import { CustomerTypeDomainStore } from './customerType/domainStore';


const stores={
     GlobalCardTypeStore:new CardTypeUiStore(),
    // GlobalCardTypeCopyDateStore:new CardTypeCopyDateDomainStore(),
    // GlobalCardTypeLateFeeStore:new CardTypeLateFeeDoMainStore(),
    // GlobalCustomerStateStore:new CustomerStateDomainStore(),
    // GlobalCustomerTypeStore:new CustomerTypeDomainStore(),
};

export default stores;