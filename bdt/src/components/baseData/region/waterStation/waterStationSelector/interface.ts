import { WaterStationUiStore } from '../uiStore'


export interface IWaterStationTreeSelectProps {

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

    GlobalWaterStationStore?: WaterStationUiStore

    setFieldsValue?: (obj: object) => void;
    /** 获取最大排序号 */
    getMaxSortNo: (fatherId:string) => Promise<number>


}