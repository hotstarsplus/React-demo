import { BusinessTypeDoMainStore } from '../doMainStore';
import { BusinessType } from '../entity';

/**
 * 业务对话框接口 
 */
export interface IBusinessTypeDialogProps {

    GlobalBusinesstypeStore?:BusinessTypeDoMainStore,

    /**
     * 取消时的回调方法
     */
    handleCancel: () => void,
    /**
     * 确定时的回调方法
     * @param {BusinessType} item 新增返回的项目
     */
    handleOk: (BusinessType:BusinessType) => void,
    
    /**
     * 编辑视图是否显示
     */
    visible: boolean
}
