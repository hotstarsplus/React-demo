import { observable } from "mobx";

/**
 * 设备档案类别接口
 */
export interface IDeviceArchiveType{

    /**
     * 档案编码
     */
    ArchiveTypeId:string;
    /**
     * 档案类别（en）
     */
    ArchiveTypeName:string;
    /**
     * 档案名称（cn）
     */
    ArchiveTypeAlias:string;
}

export class DeviceArchiveType implements IDeviceArchiveType{

    /**
     * 档案编码
     */
    @observable
    public ArchiveTypeId: string;    
    /**
     * 档案类别（en）
     */
    @observable
    public ArchiveTypeName: string;
    /**
     * 档案名称（cn）
     */
    @observable
    public ArchiveTypeAlias: string;

    /**
     * 
     * @param typeId 类别id
     * @param typeName 类别名称
     * @param typeAlias 类别别名
     */
    constructor(typeId:string='',typeName:string='',typeAlias:string=''){
        this.ArchiveTypeId=typeId;
        this.ArchiveTypeName=typeName;
        this.ArchiveTypeAlias=typeAlias;
    }

}