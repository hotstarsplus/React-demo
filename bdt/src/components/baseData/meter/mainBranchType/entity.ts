import { observable } from "mobx";

/**
 * 总分表类型表接口
 */
export interface IMainBranchType{
    id:string,
    meterBranchTypeName:string,
    description:string
}

/**
 * 总分表类型表
 */
export class MainBranchType implements IMainBranchType{
    
    /**
     * 总分表类型编码
     */
    @observable
    public id:string;

    /**
     * 总分表类型名称
     */
    @observable
    public meterBranchTypeName:string;

    /**
     *  描述
     */
    @observable
    public description:string;

    /**
     * 
     * @param id 总分表类型编码
     * @param name 总分表类型名称
     * @param des 描述
     */
    constructor(id:string="",name:string="",des:string=""){
        this.id = id;
        this.meterBranchTypeName = name;
        this.description = des;
    }


}