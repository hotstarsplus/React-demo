import { ProductTypeDomainStore } from "../domainStore";

export interface IProductTypeSelectorProps{

  
    GlobalProductTypeStore?:ProductTypeDomainStore;

    /**
     * 改变事件
     */
    onChange?:(value: any, label: any) => void;

    /**
     * 当前选择项
     */
    value?: any;

    /**
     * 是否禁用
     */
    disabled?:boolean;

}