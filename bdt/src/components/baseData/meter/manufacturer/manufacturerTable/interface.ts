import { ManufacturerUiStore } from "../uiStore";
import { Manufacturer } from "../entity";
import { ManufacturerDomainStore } from "../doMainStore";


/**
 * 厂商表格视图的props
 */
export interface IManufacturerTableProps {

    /**
     * 数据源
     */
    GlobalManufacturerStore?: ManufacturerUiStore;

    /**
     * 接口store
     */
     GlobalManufacturerDomainStore?:ManufacturerDomainStore;

    /**
     * 删除之后的回调
     */
    afterDelete?: () => void;


    /**
     * 编辑之后的回调
     * @param 实体类
     */
    onEdit: (item: Manufacturer) => void;

    /**
     * 加载数据
     */
    loadData: () => void;
}