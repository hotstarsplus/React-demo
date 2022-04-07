import { WaterStationUiStore } from "../uiStore";
import { WaterStation } from "../entity";




export interface IWaterStationTableProps {

    /**
     * 数据源
     */
    GlobalWaterStationStore?: WaterStationUiStore

    /**
     * 删除之后的回调函数
     */
    afterDelete?: () => void;

    /**
     * 编辑
     */
    onEdit: (model: WaterStation) => void;

    /**
     * 增加
     */
    onAdd: (model: WaterStation) => void;
    /** 刷新 */
    refreshUi: (jsonData: WaterStation[]) => void;

}