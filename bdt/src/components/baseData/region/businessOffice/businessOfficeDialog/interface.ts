import { BusinessOfficeUiStore } from "../uiStore";
import { BusinessOffice } from "../entity";


export interface IBusinessOfficeDialogProps {


    GlobalBusinessOfficeStore?: BusinessOfficeUiStore;


    /**
     * 确定时的回调方法 
     */
    handleOk: (BusinessOffice: BusinessOffice) => void;

    /** 获取最大排序号 */
    getMaxSortNo: (fatherId:string) => Promise<number>

    /**
     * 取消时的回调方法
     */
    handleCancel: () => void;

    /**
     * 编辑视图是否显示
     */
    visible: boolean;

    /**
     * 对话框标题
     */
    title: string;
}