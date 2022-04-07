import { MeterModelUiStore } from "../uiStore";
import { MeterModel } from "../entity";

export interface IMeterModelTableViewProps{
    /**
     * 删除之后触发的回调方法
     */
    afterDelete?: () => void
    /**
     * 业务store
     */
    GlobalMeterModelStore?:MeterModelUiStore;
    /**
     * 点击编辑后的回调方法
     */
    onEdit: (item:MeterModel) => void,
}