import { DeviceTypeDoMainStore } from "../domainStore";
import { DeviceType } from "../entity";

export interface IDeviceTypeTableViewProps{
    
    GlobalDeviceTypeStore?:DeviceTypeDoMainStore;

    /**
     * 删除之后的回调函数
     */
    afterDelete?:()=>void;

    /**
     * 编辑
     */
    onEdit:(model:DeviceType)=>void;

    /**
     * 增加
     */
    onAdd:(model:DeviceType)=>void; 
}