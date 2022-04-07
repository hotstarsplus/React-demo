import { ThirdPartyInvoiceParamUiStore } from "../../../invoice/ThirdPartyInvoiceParam/uiStore";




export interface IProductItemTreeListProps{
        GlobalThirdPartyInvoiceParamDomainStore?:ThirdPartyInvoiceParamUiStore

        /** 点击树节点触发 */
        onSelect?: (selectedKey: string) => void;

}