import { observable } from "mobx";
import { DeviceDetailField } from "../DeviceDetailField/entity";

export interface IDeviceType {
    /**
     * 自增id
     */
    AutoId: number;

    /**
     * 设备id
     */
    DeviceTypeId: string;
    /**
     * 设备类型的父级id
     */
    FatherId: string;
    /**
     * 设备类型名称
     */
    DeviceTypeName: string;
    /**
     * 设备种类id
     */
    CategoryId: string;
    /**
     * 设备种类名称
     */
    CategoryName: string;
    /**
     * 扩展属性表名
     */
    DetailTableName: string;
    /**
     * 设备类型描述
     */
    Description: string;
    /**
     * 删除标志
     */
    IsDelete: string;
    /**
     * 子集集合
     */
    children?: DeviceType[];

    Attributes?: DeviceDetailField[];



}

export class DeviceType implements IDeviceType {

    @observable
    public AutoId: number;
    @observable
    public DeviceTypeId: string;
    @observable
    public FatherId: string;
    @observable
    public DeviceTypeName: string;
    @observable
    public CategoryId: string;
    @observable
    public CategoryName: string;
    @observable
    public DetailTableName: string;
    @observable
    public Description: string;
    @observable
    public IsDelete: string;
    @observable
    public children?: DeviceType[];
    @observable
    public Attributes?: DeviceDetailField[];
    @observable
    public CpCode?:string=''


    constructor() {
        this.AutoId = 1;
        this.DeviceTypeId = "";
        this.FatherId = "";
        this.DeviceTypeName = "";
        this.CategoryId = "";
        this.CategoryName = "";
        this.DetailTableName = "";
        this.Description = "";
        this.IsDelete = '0';
        this.children = new Array<DeviceType>();
        this.Attributes = new Array<DeviceDetailField>();

    }


}

export class DeviceTypeUiEntity{
    public AutoId: number;
    public DeviceTypeId: string;
    public FatherId: string;
    public DeviceTypeName: string;
    public CategoryId: string;
    public CategoryName: string;
    public DetailTableName: string;
    public Description: string;
    public IsDelete: string;
    public children?: DeviceType[];
    public Attributes?: DeviceDetailField[];
}