import { ResidenceUiStore } from "../uiStore";



export interface IResidenceSelectorProps{

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


    GlobalResidenceStore?:ResidenceUiStore

}