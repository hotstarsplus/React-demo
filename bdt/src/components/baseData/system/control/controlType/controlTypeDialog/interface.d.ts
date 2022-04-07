import { ControlTypeDomainStore } from "../domianStore";
import { ControlType, } from "../entity";

export interface IControlTypeDialogProps{
    /**
     * 数据源
     */
    GlobalControlTypeStore?:ControlTypeDomainStore
    /**
     * 确定时的回掉方法
     */
    handleOk:(item:ControlType)=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    /**
     * 编辑视图是否显示
     */
    visiable:boolean;
    /**
     * 对话框标题
     */
    title:string;

}