import { observable } from "mobx";

/**
 * 水表特殊类型接口
 */
export interface ISpecialProcessType{
    MeterSpecialTypeId:string,
    MeterSpecialTypeName:string,
    Description:string,
    SortNo:number,
    AutoId:string,
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

    CpCode:string;

}

/**
 * 水表特殊类型实体类
 */
export class SpecialProcessType implements ISpecialProcessType{

    /**
     * 水表特殊类型编码
     */
    @observable
    public MeterSpecialTypeId:string;

    @observable
    public CpCode:string=''

    /**
     * 特殊处理类型名称
     */
    @observable
    public MeterSpecialTypeName:string;

    /**
     * 备注说明
     */
    @observable
    public Description: string;

    /**
     * 排序号
     */
    @observable
    public SortNo:number;

    /**
     * 自增
     */
    @observable
    public AutoId:string;

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
     * 
     * @param id Id
     * @param type 特殊处理类型
     * @param des 备注说明
     */
    constructor(id:string="",name:string="",des="",UpdateDate:string="",UpdaterId:string="",CreateDate:string="",CreaterId:string="",AutoId:string=""){
        this.MeterSpecialTypeId = id;
        this.MeterSpecialTypeName = name;
        this.Description = des;
        this.SortNo = 0;
        this.UpdateDate=UpdateDate;
        this.UpdaterId=UpdaterId;
        this.CreateDate=CreateDate;
        this.CreaterId=CreaterId;
    }
}