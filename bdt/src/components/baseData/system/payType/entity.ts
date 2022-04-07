import { observable } from 'mobx';

/**
 * 支付方式接口
 */
export interface IPayType{
    PayTypeId:string;
    PayTypeName:string;
    SortNo:number;
    Description:string;
    AutoId:string;
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

export class PayType implements IPayType{


    /**
     * 支付方式代码
     */
    @observable
    public PayTypeId:string;

    @observable
    public CpCode:string;

    /**
     * 支付方式名称
     */
    @observable
    public PayTypeName:string;

    /**
     * 排序号
     */
    @observable
    public SortNo:number;

    /**
     * 备注
     */
    @observable
    public Description:string;
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
     * 自增
     */
    @observable
    public AutoId:string;

    /**
     * 构造
     */
    constructor(id:string="",type:string="",des="",AutoId:string=""
    ,UpdateDate:string="",UpdaterId:string="",CreateDate:string="",CreaterId:string=""){
        this.PayTypeId=id;
        this.PayTypeName=type;
        this.SortNo=1;
        this.Description=des;
        this.AutoId=AutoId;
        this.UpdateDate=UpdateDate;
        this.UpdaterId=UpdaterId;
        this.CreateDate=CreateDate;
        this.CreaterId=CreaterId;
    }

}