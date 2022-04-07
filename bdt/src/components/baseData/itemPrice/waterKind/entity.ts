/**
 * 用水性质实体
 */
export class WaterKind{

    /**
     * 自增编码
     */
    public AutoId:number;

    /**
     * 用水性质代码
     */
    public WaterKindId:string

    /**
     * 用水性质
     */
    public WaterKindName:string;

    /**
     * 业务类型
     */
    public  BusinessType:string; 

    /**
     * 上级Id
     */
    public FatherId:string

    /**
     * 综合水价
     */
    public ColligationPrice:number;

    /**
     * 子集合
     */
    public children?:WaterKind[]

    constructor(){
        this.AutoId = 0
        this.WaterKindId="";
        this.WaterKindName = "";
        this.BusinessType="";
        this.FatherId = "";
        this.ColligationPrice = 0;
        this.children = new Array<WaterKind>();
    }


}
