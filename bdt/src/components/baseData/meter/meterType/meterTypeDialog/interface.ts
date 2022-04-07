import { MeterTypeUiStore } from "../uiStore";
import { MeterType } from "../entity";


/**
 * 编辑视图的props
 */
export interface IMeterTypeDialogProps {

    GlobalMeterTypeStore?: MeterTypeUiStore;


    /**
     * 确定时的回调方法 
     */
    handleOk: (waterKing: MeterType) => void;

    /**
     * 取消时的回调方法
     */
    handleCancel: () => void;

    /** 获取最大排序号 */
    getMaxSortNo: (CompanyName: string, fatherId: string) => Promise<number>;

    /**
     * 编辑视图是否显示
     */
    visible: boolean;

    /**
     * 对话框标题
     */
    title: string;
}