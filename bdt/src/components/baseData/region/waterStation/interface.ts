import {WaterStationUiStore } from "./uiStore";


/**
 * 供水所视图组件的接口
 */
export interface IWaterStationListViewProps{

    /**
     * 数据源
     */
    GlobalWaterStationStore?:WaterStationUiStore;
}