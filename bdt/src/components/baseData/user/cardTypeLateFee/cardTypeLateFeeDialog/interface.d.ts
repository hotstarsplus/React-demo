import { CardTypeLateFeeDoMainStore } from "../domainStore";
import { CardTypeLateFee } from "../entity";

export interface ICardTypeLateFeeDialogProps{
    
    GlobalCardTypeLateFeeStore?:CardTypeLateFeeDoMainStore;

    /**
     * 取消时的回调方法
     */
    handleCancel:() => void,

    /**
     * 点击ok时的回调函数
     */
    handleOk:(item:CardTypeLateFee) => void,

    /**
     * 编辑视图是否显示
     */
    visible: boolean
    /**
     * 对话框标题
     */
    title:string;



}