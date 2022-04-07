import { ProductItem } from "../entity";



export interface IProductItemSelectorProps{

    /**
     * 数据源
     */
    ProductItemList:ProductItem[];

    /**
     * 改变事件
     */
    onChange?:(value: any, label: any) => void;

    /**
     * 当前选择项
     */
    value?: string;

    /**
     * 是否禁用
     */
    disabled?:boolean;

}