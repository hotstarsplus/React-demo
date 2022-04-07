import { ReminderParameterDomainStore } from "../domianStore";
import { MenuAlertMessageSearchDto } from "../entity";

export interface IReminderParameterDialogProps{
    /**
     * 数据源
     */
    reminderParameterStore?:ReminderParameterDomainStore;
    /**
     * 确定时的回掉方法
     */
    handleOk:(item:MenuAlertMessageSearchDto)=>void;
    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    /**
     * 编辑视图是否显示
     */
    visiable:boolean;
}