import { ProductTypeDomainStore } from "../domainStore";
import { ProductType } from "../entity";




export interface IProductTypeTableProps{

    GlobalProductTypeStore?:ProductTypeDomainStore;

    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:ProductType) => void;

}