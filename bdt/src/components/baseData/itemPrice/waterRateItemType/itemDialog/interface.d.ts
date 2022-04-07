import { WaterRateItemType} from '../entity';
import {WaterRateItemTypeDomainStore} from '../doMainStore'
import {WaterRateItemTypeItemDialogUiAction} from './uiAction';
/**
 * WaterRateItemEditView的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IWaterRateItemTypeItemDialogProps {

    GlobalWaterRateItemTypeStore?:WaterRateItemTypeDomainStore,

    /**
     * 取消时的回调方法
     */
    handleCancel: () => void,
    /**
     * 确定时的回调方法
     * @param {WaterRateItemType} item 新增返回的项目
     */
    handleOk: (item:WaterRateItemType) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean

    /**
     * 对话框标题
     */
    title:string;
}
