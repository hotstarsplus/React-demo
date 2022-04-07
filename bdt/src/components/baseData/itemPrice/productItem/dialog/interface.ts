import { ProductItemUiStore } from '../uiStore'
import { ProductItem } from '../entity';


/**
 * WaterRateItemEditView的Props
 * 继承自FormComponentProps,内有form字段
 */
export interface IProductItemDialogProps {

    GlobalProductItemStore?: ProductItemUiStore,

    /**
     * 取消时的回调方法
     */
    handleCancel: () => void,
    /**
     * 确定时的回调方法
     * @param {WaterRateItemType} item 新增返回的项目
     */
    handleOk: (item: ProductItem) => void,



    /**
     * 编辑视图是否显示
     */
    visible: boolean;

    /**
     * 对话框标题
     */
    title: string;

}
