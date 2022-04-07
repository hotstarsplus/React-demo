import { observable } from "mobx";

export interface IDeviceDetailField {

    /**
     * 私有属性id
     */
    DetailId: number;

    /**
     * 关联的设备类型id
     */
    DeviceTypeId: string;

    /**
     * 属性字段名称（Columnx格式，x代表数字）
     */
    DetailFieldEnName: string;

    /**
     * 属性字段名称（来自用户输入）
     */
    DetailFieldCnName: string;

    /**
     * 当前设备类型的最大列索引号（递增,可能有间隔）
     */
    ColumnIdx: number;

    KeyTmp:number;

    IsDelete:string;
}

export class DeviceDetailField implements IDeviceDetailField{
    @observable
    public DetailId: number;    
    @observable
    public DeviceTypeId: string;
    @observable
    public DetailFieldEnName: string;
    @observable
    public DetailFieldCnName: string;
    @observable
    public ColumnIdx: number;
    @observable
    public KeyTmp:number;
    @observable
    public IsDelete:string;

    constructor(){
        this.DetailId=0;
        this.DeviceTypeId="";
        this.DetailFieldEnName="";
        this.DetailFieldCnName="";
        this.ColumnIdx=0;
        this.KeyTmp=-1;
        this.IsDelete='0';
    }

}

