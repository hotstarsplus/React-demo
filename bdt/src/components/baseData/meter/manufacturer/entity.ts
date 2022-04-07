import { observable } from "mobx";



/**
 * 生产厂家实体接口
 */
export interface IManufacturer{
    
    AutoId:string,

    /**
     * 生产厂家编码
     */
    ManufacturerId:string;

    /**
     * 生产厂家名称
     */
    ManufacturerName:string;

    /**
     * 描述
     */
    Description:string;

    /**
     * 传真
     */
    ManufacturerFax:string;

    /**
     * 联系人
     */
    ManufacturerLinkMan:string;

    /**
     * 电话
     */
    ManufacturerTel:string;

    /**
     * 邮箱
     */
    ManufacturerEmail:string;

    /**
     * 地址
     */
    ManufacturerAddress:string;
    /**
     * 排序号
     */
    SortNo:number;

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
 * 生产厂家实体类
 */
export class Manufacturer implements IManufacturer{

    
    /**
     * 自增
     */
    @observable
    public AutoId:string;
    @observable
    public CpCode:string;
    
    /**
     * 生产厂家编码
     */
    @observable
    public ManufacturerId:string;

    /**
     * 生产厂家名称
     */
    @observable
    public ManufacturerName:string;

    /**
     * 描述
     */
    @observable
    public Description:string ;

    /**
     * 传真
     */
    @observable
    public ManufacturerFax:string;

    /**
     * 联系人
     */
    @observable
    public ManufacturerLinkMan:string;

    /**
     * 电话
     */
    @observable
    public ManufacturerTel:string;

    /**
     * 邮箱
     */
    @observable
    public ManufacturerEmail:string

    /**
     * 地址
     */
    @observable
    public ManufacturerAddress:string;

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
     * 构造方法
     */
    constructor(Id:string='',Name:string="",address:string="",description:string=""
    ,fax:string="",linkMan:string="",tel:string="",email:string="",AutoId:string=""
    ,UpdateDate:string="",UpdaterId:string="",CreateDate:string="",CreaterId:string=""
    ){
        this.AutoId=AutoId;
        this.ManufacturerAddress=address;
        this.ManufacturerId=Id;
        this.Description=description; 
        this.CpCode=''
        this.ManufacturerFax=fax;
        this.ManufacturerLinkMan=linkMan;
        this.ManufacturerName=Name;
        this.ManufacturerTel=tel;
        this.SortNo=0;
        this.ManufacturerEmail=email;
        this.UpdateDate=UpdateDate;
        this.UpdaterId=UpdaterId;
        this.CreateDate=CreateDate;
        this.CreaterId=CreaterId;
    }

}
