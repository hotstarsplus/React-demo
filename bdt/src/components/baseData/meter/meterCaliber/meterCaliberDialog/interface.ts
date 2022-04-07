import {MeterCaliberUiStore} from '../uiStore';
import{MeterCaliber} from '../entity';

export interface IMeterCaliberDialogProps {
    GlobalMeterCaliberStore?:MeterCaliberUiStore,
    /**
     * 取消时的回调方法
     */
    handleCancel: () => void,
    /**
     * 确定时的回调方法
     * @param {WaterRateItemType} item 新增返回的项目
     */
    handleOk: (item:MeterCaliber) => void,  
    /**
     * 编辑视图是否显示
     */
    visible: boolean

    /**
     * 对话框标题
     */
    title:string;

}