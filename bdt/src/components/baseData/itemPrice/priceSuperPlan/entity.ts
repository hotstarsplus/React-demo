import { observable } from "mobx";

/**
 * 超计划价格表实体接口
 */
export interface IPriceSuperPlan{
    AutoId:number,
    waterKind:string;
    WaterRateItem:string;
    Levels:number,
    minQuantityPercent:number,
    maxQuantityPercent:number,
    Price:number,
    WaterKindId:string,
    WaterRateItemId:string,
}

/**
 * 超计划价格表实体
 */
export class PriceSuperPlan implements IPriceSuperPlan{

    /**
     * autoId
     */
    @observable
    public AutoId:number;

    /**
     * 用水性质
     */
    @observable
    public waterKind:string;

    /**
     * 水费项目
     */
    @observable
    public WaterRateItem:string;

    /**
     * 级别
     */
    @observable
    public Levels:number;
    
    /**
     * 水量比例下限
     */
    @observable
    public minQuantityPercent:number;

    /**
     * 水量比例上限
     */
    @observable
    public maxQuantityPercent:number;

    /**
     * 单价
     */
    @observable
    public Price:number;

    @observable
    public WaterKindId:string;

    @observable
    public WaterRateItemId:string;


    /**
     * 构造方法
     * @param autoId autoId
     * @param waterkind 用水性质
     * @param waterRateItem 水费项目
     * @param levels 级别
     * @param minQuantityPercent 水量比例下限
     * @param maxQuantityPercent 水量比例上限
     * @param price 单价
     */
    constructor(autoId:number=0,waterkind:string="",waterRateItem:string="",levels:number=0,minQuantityPercent:number=0,maxQuantityPercent:number=0,price:number=0,waterKindId:string="",waterRateItemId:string=""){
        this.AutoId = autoId;
        this.waterKind = waterkind;
        this.WaterRateItem = waterRateItem,
        this.Levels = levels;
        this.minQuantityPercent = minQuantityPercent;
        this.maxQuantityPercent = maxQuantityPercent;
        this.Price = price;
        this.WaterKindId = waterKindId;
        this.WaterRateItemId = waterRateItemId;
        
    }

}