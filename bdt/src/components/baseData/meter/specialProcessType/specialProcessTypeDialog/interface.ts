import { SpecialProcessTypeUiStore } from "../uiStore";
import { SpecialProcessType } from "../entity";


/**
 * 水表特殊型号新增、编辑弹出层组件的接口
 */
export interface ISpecialProcessTypeDialogProps{
    /**
     * 数据源
     */
    GlobalSpecialProgressTypeStore?:SpecialProcessTypeUiStore;

    /**
     * 回调方法  取消
     */
    handleCancel:()=>void;

    /**
     *  回调方法  确定
     *  @param 编辑的型号
     */
    handleOk:(item:SpecialProcessType)=>void;

    /**
     *  是否显示编辑视图
     */
    visiable:boolean;

}