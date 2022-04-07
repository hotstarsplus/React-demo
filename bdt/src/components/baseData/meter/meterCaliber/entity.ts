import { observable } from 'mobx';

/**
 *  水表口径接口
 */
export interface IMeterCaliber{
    AutoID:number,
    MeterCaliberId:string,
    MeterCaliberName:string,
    MaxReading:number,
    ProofCircleMonth:number,
    Description:string,
    SortNo:number,
    CreateDate:string,
    CreateId:string
    CpCode:string;
}

export class MeterCaliber implements IMeterCaliber{


    /**
     * 自增
     */
    @observable
    public AutoID:number;
    @observable
    public CpCode:string;


    /**
     * 水表口径编码
     */
    @observable
    public MeterCaliberId:string;

    /**
     * 水表口径名称
     */
    @observable
    public MeterCaliberName:string;

    /**
     * 最大读数
     */
    @observable
    public MaxReading:number;

    /**
     * 抄表周期
     */
    @observable
    public ProofCircleMonth:number;

    /**
     * 备注
     */
    @observable
    public Description:string;

    /**
     * 序号
     */
    @observable
    public SortNo:number;

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


    /**
     * 构造方法
     */
    constructor(Id:string='',Name:string='',reading:number=999.9999,circle:number=72){
        this.MeterCaliberId = Id;
        this.MeterCaliberName = Name;
        this.MaxReading = reading;
        this.ProofCircleMonth = circle;
        this.Description="";
        this.SortNo=1;
        this.CreateDate="";
        this.CreateId="";
        this.CpCode=''
    }
}