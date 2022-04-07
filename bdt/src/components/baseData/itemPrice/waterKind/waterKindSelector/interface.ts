import { WaterKind } from "../entity";



export interface IWaterKindSelectorProps{

    /**
     * 数据源
     */
    WaterKindList:WaterKind[];

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