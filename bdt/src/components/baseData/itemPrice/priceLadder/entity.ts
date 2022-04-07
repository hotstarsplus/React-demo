export class PriceLadderWaterKind{

    /**
     * 用水性质名称
     */
    public WaterKindName:string;    


    /**
     * 产品ID
     */
    public WaterKindId:string;

}
export class PriceLadderEntity{
    /**
     * 水费项目Id
     */
    public WaterFeeItemId:string;
    /**
     * 水费项目名称
     */
    public WaterFeeItemName:string;
    /**
     * 阶梯级别
     */
    public LadderLevel:string;
    /**
     * 阶梯下限
     */
    public MinQuantity:string;
    /**
     * 阶梯上限
     */
    public MaxQuantity:string;
    /**
     * 产品Id
     */
    public ProductId:string;
    /**
     * 单价
     */
    public Price:number;
}


export class LadderCycleEntity{
    // 用水性质Id
    public WaterKindId:string   

    // 用水性质名称
    public WaterKindName:string

    // 阶梯类型名称
    public LadderType:string

    // 比例
    public Proportion:string
    // 企业代码
    public CpCode:string;
}


