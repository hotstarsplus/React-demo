



export class ThirdPartyInvoiceParam{

    /**
     * 产品ID
     */
    public ProductId:string;
    public CpCode:string=''

    /**
     * 商品名称
     */
    public GoodsName:string;

    /**
     * 税率
     */
    public TaxRate:number;

    /**
     * 商品分类编码
     */
    public GoodsNo:string;

    /**
     * 优惠政策标识  此商品是否享受税收优惠政策，0：不享受，1：享受
     */
    public TaxPre:string;

    /**
     * 零税率标识
     */
    public ZeroTax:string;

    /**
     * 规格型号
     */
    public Spec:string;

    /**
     * 商品分类编码版本号
     */
    public GoodsNoVer:string;

    /**
     * 含税标志:0-不含税,1-含税
     */
    public PriceKind:string;

    /**
     * 计量单位
     */
    public Uom:string;

    /**
     * 优惠政策类型 当优惠政策标识为1时，必传
     */
    public TaxPreCon:string;

    /**
     * 产品名称
     */
    public ProductName:string;

    /**
     * 零税率名称
     */
    public ZeroTaxName:string;

    /**
     * 是否删除
     */
    public IsDelete:string;

    /**
     * 打印顺序
     */
    public SortNo: number;

}


export interface ITaxRate{

    AutoId:number;

    TaxRate:number;

}


export interface ITaxPreCon{
    
    AutoId:number;


    TaxPreCon:string;
}
