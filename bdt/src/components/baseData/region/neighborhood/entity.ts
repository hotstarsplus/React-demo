import { observable } from "mobx";


export interface INeighborhood{

    /**
     * 自增ID
     */
    AutoId:number,

    /**
     * 缴费网点编码
     */
    NeighborhoodId:string,

    /**
     * 缴费网点名称
     */
    NeighborhoodName:string,

    /**
     * 父级ID
     */
    FatherId:string,

    /**
     * 地址
     */
    NeighborhoodAddress:string,

    /**
     * 联系人
     */
    NeighborhoodLinkMan:string,
    
    /**
     * 电话
     */
    NeighborhoodTel:string,

    /**
     * 	描述
     */
    Description:string,

    /**
     * 排序号
     */
    SortNo:number,

    /**
     * 更新时间
     */
    UpdateDate:string;

    /**
     * 更新者id
     */
    UpdaterId:string;

    /**
     * 创建时间
     */
    CreateDate:string;

    /**
     * 创建者
     */
    CreaterId:string;

    /**
     * 子集合
     */
    children?:Neighborhood[],
}

/**
 * 缴费网点表(营业所） 实体
 */
export class  Neighborhood implements INeighborhood{

    /**
     * 自增ID
     */
    @observable
    public AutoId:number;

    /**
     * 缴费网点编码
     */
    @observable
    public NeighborhoodId:string;

    /**
     * 缴费网点名称
     */
    @observable
    public NeighborhoodName:string;

    /**
     * 父级ID
     */
    @observable
    public FatherId:string;

    /**
     * 	地址
     */
    @observable
    public NeighborhoodAddress:string;

    /**
     * 联系人
     */
    @observable
    public NeighborhoodLinkMan:string;

    /**
     * 电话
     */
    @observable
    public NeighborhoodTel:string;

    /**
     * 描述
     */
    @observable
    public Description:string;

    /**
     * 排序号
     */
    @observable
    public SortNo:number;

    /**
     * 子集合
     */
    @observable
    public children?:Neighborhood[];

    /**
     * 更新时间
     */
    @observable
    public UpdateDate:string;

    /**
     * 更新者id
     */
    @observable
    public UpdaterId:string;

    /**
     * 创建时间
     */
    @observable
    public CreateDate:string;

    /**
     * 创建者id
     */
    @observable
    public CreaterId:string;

    /**
     * 构造
     */
    constructor(){

        this.AutoId=0;

        this.NeighborhoodId="";

        this.NeighborhoodName="";

        this.NeighborhoodLinkMan="";

        this.NeighborhoodTel="";

        this.FatherId="";

        this.NeighborhoodAddress = "";

        this.Description="";

        this.UpdateDate="";

        this.UpdaterId="";

        this.CreateDate="";

        this.CreaterId="";

        this.children=new Array<Neighborhood>();

    }

}  

export class NeighborhoodUiEntity{

    /**
     * 自增编码
     */
    public key:string;

    /**
     * 代码
     */
    public value:string;

    /**
     * 名称
     */
    public title:string;

    /**
     * 父级ID
     */
    public FatherId:string;
    
    /**
     * 地址
     */
    public NeighborhoodAddress:string;

    /**
     * 序号
     */
    public SortNo:number;
    
    /**
     * 电话 
     */
    public NeighborhoodTel:string;

    /**
     * 联系人
     */
    public NeighborhoodLinkMan:string;


    /**
     * 描述
     */
    public Description:string;

    /**
     * 更新时间
     */
    public UpdateDate:string;

    /**
     * 更新者id
     */
    public UpdaterId:string;

    /**
     * 创建时间
     */
    public CreateDate:string;

    /**
     * 创建者id
     */
    public CreaterId:string;

    /**
     * 子集合
     */
    public children?:NeighborhoodUiEntity[];
}

    

