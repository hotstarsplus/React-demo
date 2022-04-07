import { PayBankUiStore } from "../uiStore";



export interface IPayBankSelectorProps{


    /**
     * 改变事件
     */
    onChange?:(value: any, label: any) => void;

    onSelect?:any;

    /**
     * 当前选择项
     */
    value?: any;

    /**
     * 是否禁用
     */
    disabled?:boolean;

    list?:any;

    GlobalPayBankStore?:PayBankUiStore;
    /**
     * 设置字段值，表单使用
     */
    setFieldsValue?:(obj: object)=>void;

}