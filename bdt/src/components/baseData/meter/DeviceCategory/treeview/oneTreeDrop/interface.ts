import { TypeDoMainStore } from "../domainStore";

/**
 * 某一种类型的树的Props
 */
export interface IOneTreedownselectProps {
    /**
     * 数据源
     */
    list?: any;

    /**
     * 改变事件
     */
    onChange?: (value: any, label: any) => void;

    /**
     * 当前选择项
     */
    value?: any;

    /***
     * 选中事件
     */
    onSelect?: (fatherId: string) => void;
    /**
     * 设置字段值，表单使用
     */
    setFieldsValue?: (obj: object) => void;

    /**
     * Store
     */
    TreeTypeStore?: TypeDoMainStore
}