import { observable } from "mobx";

/**
 * 普通水价实体接口
 */
export interface IPriceNormal{
    AutoId:number,
    WaterKind:string,
    WaterRateItem:string,
    Price:number,
    WaterKindId:string,
    itemId:string
}

/**
 * 普通水价实体
 */
export class PriceNormal implements IPriceNormal{
    
    /**
     * autoId
     */
    @observable
    public AutoId:number;

    /**
     * 用水性质
     */
    @observable
    public WaterKind:string;

    /**
     * 水费项目
     */
    @observable
    public WaterRateItem:string;

    /**
     * 单价
     */
    @observable
    public Price:number;

    @observable
    public WaterKindId:string;

    @observable
    public itemId:string;

    /**
     * 构造
     * @param autoId autoId
     * @param waterKind 用水性质
     * @param waterRateItem 水费项目
     * @param price 单价
     */
    constructor(autoId:number=0,waterKind:string = "",waterRateItem:string = "",price:number=0,waterKindId:string="",itemId:string=""){
        this.AutoId = autoId;
        this.WaterKind = waterKind;
        this.WaterRateItem = waterRateItem;
        this.Price = price;
        this.WaterKindId = waterKindId;
        this.itemId = itemId;
    }
}