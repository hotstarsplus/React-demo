import { observable } from "mobx";
import { DeviceCategoryCommonField } from "../DeviceCategoryCommonField/entity";


/**
 * 设备种类实体
 */
export interface IDeviceCategory{
    /**
     * 设备种类id
     */
    CategoryId:string;
    /**
     * 设备种类名称
     */
    CategoryName:string;
    /**
     * 设备关联的表名
     */
    LinkTable:string;
    /**
     * 设备种类描述
     */
    Description:string;

    /**
     * 设备种类关联的通用的属性
     */
    CommonFields?: DeviceCategoryCommonField[];
}

export class DeviceCategory implements IDeviceCategory{
    /**
     * 设备种类id
     */
    @observable
    public CategoryId: string;   
    /**
     * 设备种类名称
     */
    @observable
    public CategoryName: string;
    /**
     * 设备关联表名
     */
    @observable
    public LinkTable: string;
    /**
     * 设备类别描述
     */
    @observable
    public Description: string;

    @observable
    public CommonFields:DeviceCategoryCommonField[];

    /**
     * 
     * @param categoryId 设备种类id
     * @param name 设备种类名称
     * @param tableName 关联表名
     * @param des 描述
     */
    constructor(categoryId:string='',name:string='',tableName:string='',des:string=''){
        this.CategoryId=categoryId;
        this.CategoryName=name;
        this.LinkTable=tableName;
        this.Description=des;
        this.CommonFields = new Array<DeviceCategoryCommonField>();
    }

}
