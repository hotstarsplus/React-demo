import { MeterTypeUiStore } from "../uiStore";

export interface IMeterTypeSearchViewProps{
    GlobalMeterTypeStore?:MeterTypeUiStore;
     /** 加载数据 */
     loadingData: () => void
}