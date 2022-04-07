


export class ProductType{

    /**
     * 自增ID
     */
    public AutoId:number;

    /**
     * 产品类型ID
     */
    public ProductTypeId:string
    public CpCode:string=''

    /**
     * 产品类型名称
     */
    public ProductTypeName:string

    /**
     * 父级ID
     */
    public FatherId:string

    /**
     * 是否系统编码
     */
    public IsSystemCode:string;

    /**
     * 增加日期时间
     */
    public CreateDate:string;

    /**
     * 修改日期时间
     */
    public UpdateDate:string;

    /**
     * 创建者Id
     */
    public CreaterId:string;

    /**
     * 上次更新者Id
     */
    public UpdaterId:string;

    /**
     * 是否删除
     */
    public IsDelete:string;

    /**
     * 子集合
     */
    public children?:ProductType[];

    constructor(){
        this.AutoId=0;
        this.ProductTypeId="";
        this.ProductTypeName="";
        this.FatherId="";
        this.IsSystemCode="0";
        this.CreateDate="";
        this.UpdateDate="";
        this.CreaterId="";
        this.UpdaterId="";
        this.IsDelete="0";
        this.children = new Array<ProductType>();
    }


}

