import { observable } from "mobx";

/**
 * 计费方式实体接口
 */
export interface ICalcFeeType{
    AutoId:number;
    CalcFeeTypeId:string;
    CalcFeeTypeName:string;
    BusinessType:string;
}
/**
 * 计费方式
 */
export class CalcFeeType implements ICalcFeeType{

    /**
     * 自增id
     */
    @observable
    public AutoId:number;

    @observable
    public CpCode?:string=''

    /**
     * 计费方式类型
     */
    @observable
    public CalcFeeTypeId:string;

    /**
     * 计费方式类型名称
     */
    @observable
    public CalcFeeTypeName:string;

    @observable
    public BusinessType:string;

    /**
     * 
     * @param type 计费方式类型
     * @param name 计费方式类型名称
     */
    constructor(type:string="",name:string="",business="",des=""){

        this.CalcFeeTypeId = type;
        this.CalcFeeTypeName = name;
        this.BusinessType = business
    }
}