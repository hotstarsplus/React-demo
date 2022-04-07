import { MeterStateUiStore } from "../uiStore";
import { MeterState } from "../entity";


/**
 * 新增/编辑弹出层的props
 */
export interface IMeterStateDialogProps{

    /**
     * 数据源
     */
    GlobalMeterStateStore?:MeterStateUiStore;

    /**
     * 回调方法  取消
     */
    handleCancel:()=>void;

    /**
     *  回调方法  确定
     *  @param 编辑的水表状态
     */
    handleOk:(item:MeterState)=>void;

    /**
     *  是否显示编辑视图
     */
    visiable:boolean;

    /**
     * 对话框标题
     */
    title:string;

}