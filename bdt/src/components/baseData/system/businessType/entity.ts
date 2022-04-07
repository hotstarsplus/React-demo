import { ProductKind } from "../../itemPrice/productKind/entity";


/**
 * 业务实体类
 */
export class BusinessType {
    public AutoId:number;
    /**
     * 业务类别编码
     */
    public BusinessTypeId: number;
    public CpCode:string=''

    /**
     * 业务类别名称
     */
    public BusinessTypeName: string;

    /**
     * 排序号
     */
    public SortNo: number;

    /**
     * 是否启用
     */
    public IsEnable: string;

    /**
     * 是否启用
     */
    public Children: BusinessType[];

    public IsOrganization: boolean = false;

    /**
     * 备注
     */
    public Description: string;

    public ProductKinds:ProductKind[];

    /**
     * 构造方法
     */
    constructor() {
        this.AutoId = 0
        this.BusinessTypeId = 0;
        this.BusinessTypeName = "";
        this.Description = "";
        this.IsEnable = "";
        this.SortNo = 0;
        this.ProductKinds=new Array<ProductKind>();
    }
}

