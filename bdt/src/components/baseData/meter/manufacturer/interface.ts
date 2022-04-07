import { ManufacturerDomainStore } from "./doMainStore";
import { ManufacturerUiStore } from "./uiStore";


/**
 * 水表厂商视图的的Props
 */
export interface IManufacturerListViewProps {
    /**
     * 数据源
     */
    GlobalManufacturerStore?: ManufacturerUiStore;
    /**
     * 接口store
     */
    GlobalManufacturerDomainStore?: ManufacturerDomainStore;

}