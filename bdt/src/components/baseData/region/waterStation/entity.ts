import { observable } from "mobx";


export interface IWaterStation{

    /**
     * 自增ID
     */
    AutoId:number,

    /**
     * 供水所编码
     */
    WaterStationId:string,

    /**
     * 供水所名称
     */
    WaterStationName:string,

    /**
     * 父级ID
     */
    FatherId:string,

    /**
     * 地址
     */
    WaterStationAddress:string,

    /**
     * 联系人
     */
    WaterStationLinkMan:string,
    
    /**
     * 电话
     */
    WaterStationTel:string,

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
    children?:WaterStation[],
}

/**
 * 供水所表(营业所） 实体
 */
export class  WaterStation implements IWaterStation{

    /**
     * 自增ID
     */
    @observable
    public AutoId:number;

    /**
     * 供水所编码
     */
    @observable
    public WaterStationId:string;

    @observable
    public CpCode?:string;

    /**
     * 供水所名称
     */
    @observable
    public WaterStationName:string;

    /**
     * 父级ID
     */
    @observable
    public FatherId:string;

    /**
     * 	地址
     */
    @observable
    public WaterStationAddress:string;

    /**
     * 联系人
     */
    @observable
    public WaterStationLinkMan:string;

    /**
     * 电话
     */
    @observable
    public WaterStationTel:string;

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
    public children?:WaterStation[];

    /**
     * 构造
     */
    constructor(){

        this.AutoId=0;

        this.WaterStationId="";

        this.WaterStationName="";

        this.WaterStationLinkMan="";

        this.WaterStationTel="";

        this.FatherId="";

        this.WaterStationAddress = "";

        this.Description="";

        this.UpdateDate="";

        this.UpdaterId="";

        this.CreateDate="";

        this.CreaterId="";

        this.children=new Array<WaterStation>();

    }

}  

export class WaterStationUiEntity{

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
    public WaterStationAddress:string;

    /**
     * 序号
     */
    public SortNo:number;
    
    /**
     * 电话 
     */
    public WaterStationTel:string;

    /**
     * 联系人
     */
    public WaterStationLinkMan:string;


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
    public children?:WaterStationUiEntity[];
}

    

