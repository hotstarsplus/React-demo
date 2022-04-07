import { ManufacturerUiStore } from "../uiStore";
import { Manufacturer } from "../entity";


/**
 * 厂商新增、编辑弹出层的props
 */
export interface IManufacturerDialogProps{

    /**
     * 数据源
     */
    GlobalManufacturerStore?:ManufacturerUiStore;

    /**
     * 回调方法  取消
     */
    handleCancel:()=>void;

    /**
     *  回调方法  确定
     *  @param 编辑的厂商
     */
    handleOk:(item:Manufacturer)=>void;

    /**
     *  是否显示编辑视图
     */
    visiable:boolean;
    /**
     * 对话框标题
     */
    title:string;

}