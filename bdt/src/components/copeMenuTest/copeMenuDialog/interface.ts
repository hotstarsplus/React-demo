import { UserUiStore } from "../store";
import { CopeMenu } from "../entity";


/**
 * 编辑视图的props
 */
export interface IUserDialogProps{

    GlobalUserUiStore?:UserUiStore;

    /**
     * 确定时的回调方法 
     */
    handleOk?:(waterKing:CopeMenu)=>void;

    /**
     * 取消时的回调方法
     */
    handleCancel?:()=>void;

    /**
     * 编辑视图是否显示
     */
    visible?:boolean;

    /**
     * 对话框标题
     */
    title?:string;

    getMaxSortNo?:(fatherId:string)=>Promise<number>
}