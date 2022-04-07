import { WaterFeeItem } from "../entity";



export interface IWaterFeeItemSelectorProps{

    /**
     * 数据源
     */
    WaterFeeItemList:WaterFeeItem[];

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