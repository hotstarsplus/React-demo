import {RegionUiStore} from '../uiStore'


export interface IRegionTreeSelectProps{


    /**
     * 改变事件
     */
    onChange?:(value: any, label: any) => void;

    /**
     * 当前选择项
     */
    value?: any;

    /**
     * 是否禁用
     */
    disabled?:boolean;


    GlobalRegionStore?:RegionUiStore;



}
