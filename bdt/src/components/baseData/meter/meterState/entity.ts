import { observable } from "mobx";


/**
 * 水表状态接口
 */
export interface IMeterState{
    MeterStateId:string;
    MeterStateName:string;
    Description: string;
    SortNo:number;
    AutoId:string;
    /**
     * 更新时间
     */
    UpdateDate:string;

    CpCode:string;

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
 * 水表状态实体类
 */
export class MeterState implements IMeterState {

    /**
     * 水表状态代码
     */
    @observable
    public MeterStateId:string;

    @observable
    public CpCode:string=''

    /**
     * 水表状态
     */
    @observable
    public MeterStateName:string;

    /**
     * 水表状态代码
     */
    @observable
    public Description: string;

    /**
     * 水表状态代码
     */
    @observable
    public SortNo: number;

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


    constructor(Id:string='',Name:string="",description:string="",AutoId:string=""
    ,UpdateDate:string="",UpdaterId:string="",CreateDate:string="",CreaterId:string=""){
        this.MeterStateId=Id;
        this.MeterStateName=Name;
        this.Description=description;
        this.SortNo=0;
        this.AutoId=AutoId;
        this.UpdateDate=UpdateDate;
        this.UpdaterId=UpdaterId;
        this.CreateDate=CreateDate;
        this.CreaterId=CreaterId;
    }

}