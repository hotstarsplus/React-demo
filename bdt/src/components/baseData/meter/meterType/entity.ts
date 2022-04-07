import { observable } from "mobx";

export interface IMeterType{
    /**
     * 自增ID
     */
     AutoId:number;

    /**
     * 水表类型ID
     */
     MeterTypeId:string

    /**
     * 水表类型名称
     */
     MeterTypeName:string

    /**
     * 父级ID
     */
     FatherId:string

   /**
    * 排序号
    */
    SortNo:number

   /**
    * 备注
    */
    Description:string

    
    /**
     * 创建时间
     */
    CreateDate:string;
    
    /**
     * 创建人
     */
    CreaterId:string;
    /**
     * 子集合
     */
     children:MeterType[];
     

}
/**
 * 水表类型实体
 */
export class MeterType implements IMeterType{
    @observable
    public AutoId:number;
    @observable
    public CpCode:string;

    @observable
    public MeterTypeId:string

    @observable
    public MeterTypeName:string

    @observable
    public FatherId:string

    @observable
   public SortNo:number

   @observable
   public Description:string

   @observable
    public children:MeterType[];

    @observable
    public CreateDate:string;

    @observable
    public CreaterId:string;
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
     * 
     * @param metertypeid    水表类型ID
     * @param metertypename  水表类型名称
     * @param fatherid       父级ID
     * @param description    备注
     * @param createdate     创建时间
     * @param createid       创建人
     */
    constructor(
        AutoId:number=0,  
        // SortNo:number=0
        metertypeid:string="",  metertypename:string="", 
        fatherid:string="",  description:string="", 
        updaterId="",updateDate="",
        createdate:string="",  createid:string="", 
    ){
        this.AutoId=0;
        this.MeterTypeId=metertypeid;
        this.MeterTypeName=metertypename;
        this.FatherId=fatherid;
        this.SortNo=1;
        this.Description=description;
        this.children = new Array<MeterType>();
        this.CreateDate=createdate;
        this.CreaterId=createid;
        this.UpdateDate = updateDate;
        this.UpdaterId = updaterId;
        this.CpCode=''
    }
}
export class MeterTypeUiEntity{
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
     * 序号
     */
    public SortNo:number;
    

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
    /** 企业代码 */
    public CpCode:string;

    /**
     * 子集合
     */
    public children?:MeterTypeUiEntity[];
}
