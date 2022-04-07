import {QuantityTapyUiStore} from '../uiStore';
import{QuantityTapy} from '../entity';

export interface IQuantityTapyDialogProps {
    GlobalQuantityTapyStore?:QuantityTapyUiStore,
    /**
     * 取消时的回调方法
     */
    handleCancel: () => void,
    /**
     * 确定时的回调方法
     * @param {WaterRateItemType} item 新增返回的项目
     */
    handleOk: (item:QuantityTapy) => void, 
    /**
     * 编辑视图是否显示
     */
    visible: boolean
}