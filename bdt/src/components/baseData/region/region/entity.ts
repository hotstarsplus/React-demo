import { observable } from "mobx";


export interface IRegion{

    /**
     * 自增ID
     */
    AutoId:number,

    /**
     * 片区编码
     */
    RegionId:string,

    /**
     * 片区名称
     */
    RegionName:string,

    /**
     * 父级ID
     */
    FatherId:string,

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
    children?:Region[],
}

/**
 * 片区表(营业所） 实体
 */
export class  Region implements IRegion{

    /**
     * 自增ID
     */
    @observable
    public AutoId:number;
    @observable
    public CpCode:string=''

    /**
     * 是否删除
     */
    @observable
    public IsDelete:string;
    /**
     * 片区编码
     */
    @observable
    public RegionId:string;

    /**
     * 片区名称
     */
    @observable
    public RegionName:string;

    /**
     * 父级ID
     */
    @observable
    public FatherId:string;
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
    public children?:Region[];

    /**
     * 构造
     */
    constructor(){

        this.AutoId=0;

        this.RegionId="";

        this.RegionName="";

        this.FatherId="";

        this.Description="";

        this.UpdateDate="";

        this.UpdaterId="";

        this.CreateDate="";

        this.CreaterId="";
        this.IsDelete="0";

        this.children=new Array<Region>();

    }

}  

export interface IOrganition{
    /**
     * 组织code
     */
    OrganitionCode:string;
    /**
     * 公司名
     */
    OrganizationName:string;
    /**
     * 子集
     */
    Children:IOrganition[];
}