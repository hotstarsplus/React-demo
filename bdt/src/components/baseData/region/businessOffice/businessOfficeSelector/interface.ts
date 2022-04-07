import { BusinessOfficeUiStore } from '../uiStore'


export interface IBusinessOfficeTreeSelectProps {


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

    key?: any;
    FatherId?: any;
    value?: any;

    /**
     * 是否禁用
     */
    disabled?: boolean;

    /**
     * 选中事件
     */

    onSelect?: (fatherId: string) => void;
    onSearch?: (fatherId: string) => void
    GlobalBusinessOfficeStore?: BusinessOfficeUiStore

    /**
     * 设置字段值，表单使用
     */
    setFieldsValue?: (obj: object) => void;
    /** 获取最大排序号 */
    getMaxSortNo: (fatherId: string) => Promise<number>;

}
export interface IBusinessOfficeTreeSelectState {
    /**
     * 选中的值
     */
    value?: any;
}