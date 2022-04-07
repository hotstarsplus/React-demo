import { PayTypeUiStore } from "../uiStore";
import { PayType } from "../entity";


/**
 * 支付方式新增、编辑弹出层组件的接口
 */
export interface IPayTypeDialogProps{

    /**
     * 数据源
     */
    GlobalPayTypeStore?:PayTypeUiStore;

    /**
     * 回调方法  取消
     */
    handleCancel:()=>void;

    /**
     *  回调方法  确定
     *  @param 编辑的支付方式
     */
    handleOk:(item:PayType)=>void;

    /**
     *  是否显示编辑视图
     */
    visiable:boolean;

}