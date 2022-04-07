import { DeviceTypeDoMainStore } from "../domainStore";
import { DeviceType } from "../entity";



/**
 * 编辑视图的props
 */
export interface IDeviceTypeDialogProps{

    GlobalDeviceTypeStore?:DeviceTypeDoMainStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:(waterKing:DeviceType)=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    /**
     * 编辑视图是否显示
     */
    visible:boolean;
    /**
     * 对话框标题
     */
    title:string;
}