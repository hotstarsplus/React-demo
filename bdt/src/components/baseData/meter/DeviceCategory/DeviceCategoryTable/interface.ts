import { DeviceCategoryDoMainStore } from "../domainStore";


export interface IDeviceCategoryTableViewProps{
    
    GlobalDeviceCategoryStore?:DeviceCategoryDoMainStore;

    /**
     * 查看通用属性
     */
    onCheck:()=>void; 
}