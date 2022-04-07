import { DeviceTypeDoMainStore } from "../domainStore";

export interface IDeviceTypeCommonFieldDialogProps{
    GlobalDeviceTypeStore?:DeviceTypeDoMainStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:()=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    /**
     * 编辑视图是否显示
     */
    visible:boolean;

    /**
     * 对话框的标题
     */
    dialogTitle:string;
}