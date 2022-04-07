import { PayBankUiStore } from "../uiStore";
import { PayBank } from "../entity";


/**
 * 编辑视图的props
 */
export interface IPayBankDialogProps{

    GlobalPayBankStore?:PayBankUiStore;

    
    /**
     * 确定时的回调方法 
     */
    handleOk:(waterKing:PayBank)=>void;

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

    getMaxSortNo:(fatherId:string)=>Promise<number>
}