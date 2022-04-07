import { observable } from "mobx";

/**
 * 小区接口
 */
export interface IResidence{

    /**
     * 自增ID
     */
    AutoId:number;

    /**
     * 小区编码
     */
    GardenId:string;

    /**
     * 小区名称
     */
    GardenName:string;

    /**
     * 父级ID
     */
    FatherId:string;

    /**
     * 地址
     */
    GardenAddress:string;

    // /**
    //  * 联系人
    //  */
    // linkMan:string;

    /**
     * 描述
     */
    Description:string;

    /**
     * 子集集合
     */
    children?:Residence[];

    /**
     * 序号
     */
    SortNo:number;

    /**
     * 创建时间
     */
     CreateDate:string;

    /**
     * 创建人
     */
     CreateId:string;
}

/**
 * 小区
 */
export class Residence implements IResidence{

    /**
     * 自增ID
     */
    @observable
    public AutoId:number;

    @observable
    public CpCode:string=''
    
    /**
     * 小区编码
     */
    @observable
    public GardenId :string
    
    /**
     * 小区名称
     */
    @observable
    public GardenName:string;
    
    /**
     * 父级ID
     */
    @observable
    public FatherId:string;
    
    /**
     * 地址
     */
    @observable
    public GardenAddress:string;
    
    // /**
    //  * 联系人
    //  */
    // @observable
    // public linkMan:string;
    
    /**
     * 描述
     */
    @observable
    public Description:string;
    
    /**
     * 序号
     */
    @observable
    public SortNo:number;

    /**
     * 子集集合
     */
    @observable
    public children?:Residence[];

    /**
     * 创建时间
     */
    @observable
    public CreateDate:string;

    /**
     * 创建人
     */
    @observable
    public CreateId:string;
    
    constructor(){
        this.AutoId = 0;
        this.GardenId = "";
        this.GardenName = "";
        this.FatherId = "";
        this.GardenAddress = "";
        // this.linkMan = "";
        this.Description = "";
        this.SortNo=0;
        this.children = new Array<Residence>();
        this.CreateId="";
        this.CreateDate="";
    }
    
}

