import { observable } from "mobx";

/**
 * 抄表类型接口
 */
export interface ICopyType{

    id:string,
    copyTypeName:string,
    description:string,
}

/**
 * 抄表类型
 */
export class CopyType implements ICopyType{

    /**
     * 抄表类型id
     */
    @observable
    public id:string;

    /**
     * 抄表类型名称
     */
    @observable
    public copyTypeName:string;

    /**
     * 备注
     */
    @observable
    public description:string;

    /**
     * 
     * @param id 抄表类型id
     * @param name 抄表类型名称
     * @param des 备注
     */
    constructor(id:string = "",name:string = "",des=""){

        this.id = id;
        this.copyTypeName = name;
        this.description = des;
    }
}