

export class SuperPlanPriceBase{

    /**
     * 用水性质名称
     */
    public WaterKindName:string;    


    /**
     * 产品ID
     */
    public ProductId:string;

}



export class SuperPlanPrice extends SuperPlanPriceBase{

    /**
     * 自增ID
     */
    public AutoId:number;

   
    /**
     * 水量比例下限
     */
    public MinQuantityPercent:number;

    /**
     * 水量比列上限
     */
    public MaxQuantityPercent:string;

    /**
     * 价格
     */
    public Price:number;

    /**
     * 是否删除
     */
    public IsDelete:string;

    /**
     * 行状态
     */
    public RowState:"Add"|"Modify"|"Delete"|"Default";
    public CpCode:string=''


    constructor(){
        super();
        this.Price = 0;
        this.ProductId="";
        this.WaterKindName="";
        this.IsDelete="0";
        this.AutoId = 0;
        this.MinQuantityPercent=0;
        this.MaxQuantityPercent = "";
        this.RowState="Add";
    }


}