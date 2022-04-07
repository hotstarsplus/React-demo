import { MeterTypeUiStore } from "../uiStore";
import { MeterType } from "../entity";




export interface IMeterTypeTableProps {

    /**
     * 数据源
     */
    GlobalMeterTypeStore?: MeterTypeUiStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?: () => void;

    /**
     * 编辑
     */
    onEdit: (model: MeterType) => void;

    /**
     * 增加
     */
    onAdd: (model: MeterType) => void;

    /** 加载数据 */
    loadingData: () => void

}