import { ControlTypeDomainStore } from "./domianStore";

/**
 * 控制方式的视图的Props
 */
export interface IControlTypeTableViewProps{
    /**
     * 数据源
     */
    GlobalControlTypeStore?:ControlTypeDomainStore
}