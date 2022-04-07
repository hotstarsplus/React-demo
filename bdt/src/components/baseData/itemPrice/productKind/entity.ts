


export class ProductKind{


    /**
     * 产品性质ID
     */
    public ProductKindId:string;
    
    public CpCode:string;


    /**
     * 产品性质名称
     */
    public ProductKindName:string;


    /**
     * 业务类型ID
     */
    public BusinessTypeId:number;


    /**
     * 业务类型名称
     */
    public BusinessTypeName:string;

    /**
     * 综合价格
     */
    public ColligationPrice:string;


    /**
     * 父级ID
     */
    public FatherId:string;


    /**
     * 子集合
     */
    public children?:ProductKind[];

    /**
     * 构造函数
     */
    constructor(){
        this.ProductKindId="";
        this.ProductKindName="";
        this.FatherId = "";
        this.ColligationPrice = "";
        this.BusinessTypeId = 0;
        this.children = new Array<ProductKind>();

    }




}


export class ProductKindTreeData{
    /**
     * 自增编码
     */
    public key:string;

    /**
     * 用水性质代码
     */
    public value:string;

    /**
     * 用水性质名称
     */
    public title:string;

    /**
     * 上级Id
     */
    public ParentId:string;


    /**
     * 是否末级
     */
    public IsEndLevel:boolean;


    /**
     * 描述
     */
    public Description:string;

    /**
     * 子集合（树形数据）
     */
    public children?:ProductKindTreeData[];
}