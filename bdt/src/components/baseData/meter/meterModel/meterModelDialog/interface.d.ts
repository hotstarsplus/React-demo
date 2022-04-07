import { MeterModelUiStore } from "../uiStore";
import { MeterModel } from "../entity";

export interface IMeterModelDialogProps {
    GlobalMeterModelStore?:MeterModelUiStore,
    /**
     * 取消时的回调方法
     */
    handleCancel: () => void,
    /**
     * 确定时的回调方法
     * @param {MeterModel} meterModel 新增返回的项目
     */
    handleOk: (meterModel:MeterModel) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean
    /**
     * 对话框标题
     */
    title:string;


}
