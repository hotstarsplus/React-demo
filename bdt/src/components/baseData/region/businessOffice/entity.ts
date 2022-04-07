import { observable } from "mobx";


export interface IBusinessOffice{

    /**
     * 自增ID
     */
    AutoId:number,

    /**
     * 营业网点编码
     */
    BusinessOfficeId:string,

    /**
     * 营业网点名称
     */
    BusinessOfficeName:string,

    /**
     * 父级ID
     */
    FatherId:string,

    /**
     * 地址
     */
    BusinessOfficeAddress:string,

    /**
     * 联系人
     */
    BusinessOfficeLinkMan:string,
    
    /**
     * 电话
     */
    BusinessOfficeTel:string,

    /**
     * 	描述
     */
    Description:string,

    /**
     * 排序号
     */
    SortNo:number,

    /**
     * 子集合
     */
    children?:BusinessOffice[],
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
}

/**
 * 营业网点表(营业所） 实体
 */
export class  BusinessOffice implements IBusinessOffice{

    /**
     * 自增ID
     */
    @observable
    public AutoId:number;

    /**
     * 营业网点编码
     */
    @observable
    public BusinessOfficeId:string;

    /**
     * 营业网点名称
     */
    @observable
    public BusinessOfficeName:string;

    /**
     * 父级ID
     */
    @observable
    public FatherId:string;

    /**
     * 	地址
     */
    @observable
    public BusinessOfficeAddress:string;

    @observable
    public CpCode?:string=''

    /**
     * 联系人
     */
    @observable
    public BusinessOfficeLinkMan:string;

    /**
     * 电话
     */
    @observable
    public BusinessOfficeTel:string;

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
     * 子集合
     */
    @observable
    public children?:BusinessOffice[];

    /**
     * 构造
     */
    constructor(){

        this.AutoId=0;

        this.BusinessOfficeId="";

        this.BusinessOfficeName="";

        this.BusinessOfficeLinkMan="";

        this.BusinessOfficeTel="";

        this.FatherId="";

        this.BusinessOfficeAddress = "";

        this.Description="";

        this.UpdateDate="";

        this.UpdaterId="";

        this.CreateDate="";

        this.CreaterId="";

        this.children=new Array<BusinessOffice>();

    }

}  

export class BusinessOfficeUiEntity{

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
    public BusinessOfficeAddress:string;

    /**
     * 序号
     */
    public SortNo:number;
    
    /**
     * 电话 
     */
    public BusinessOfficeTel:string;

    /**
     * 联系人
     */
    public BusinessOfficeLinkMan:string;


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
    public children?:BusinessOfficeUiEntity[];
}

    

