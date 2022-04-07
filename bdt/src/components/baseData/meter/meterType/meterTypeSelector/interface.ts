import { MeterTypeUiStore } from "../uiStore";



export interface IMeterTypeSelectorProps {
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

    key?: any;

    FatherId?: any;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /***
     * 选中事件
     */
    onSelect?: (fatherId: string) => void;
    /**
     * 设置字段值，表单使用
     */
    setFieldsValue?: (obj: object) => void;
    /** 获取最大排序号 */
    getMaxSortNo: (CompanyName: string, fatherId: string) => Promise<number>;

    GlobalMeterTypeStore?: MeterTypeUiStore

}