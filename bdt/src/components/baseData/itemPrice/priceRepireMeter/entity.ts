import { observable } from "mobx";

/**
 * 校表维修费实体接口
 */
export interface IPriceRepireMeter{
    AutoId:number,
    MeterCaliberId:string,
    Price:number,
    MeterCaliber:string
}
/**
 * 校表维修费实体
 */
export class PriceRepireMeter implements IPriceRepireMeter{

    /**
     * 代码
     */
    @observable
    public AutoId:number;

    /**
     * 水表口径
     */
    @observable
    public MeterCaliberId:string;

    /**
     * 单价
     */
    @observable
    public Price:number;

    @observable
    public MeterCaliber:string;

    /**
     * 
     * @param autoId 代码
     * @param caliberId 水表口径
     * @param price 单价
     */
    constructor(autoId:number=0,caliberId:string="",price:number=0){
        this.AutoId=autoId;
        this.MeterCaliberId=caliberId;
        this.Price = price;
    }
}