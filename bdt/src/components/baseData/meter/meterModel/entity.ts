import { observable } from "mobx";
/**
 * 水表类型实体接口
 */
export interface IMeterModel{
    AutoId:number;
    MeterModelId:string;
    MeterModelName:string;
    Description:string;
    SortNo:number;
    CreateDate:string;
    CreateId:string;
    CpCode:string;
}

/**
 * 水表类型实体
 */
export class MeterModel implements IMeterModel{

    /**
     * 自增
     */
    @observable
    public AutoId:number;
    @observable
    public CpCode:string=''

    /**
     * 水表型号代码
     */
    @observable
    public MeterModelId:string;

    /**
     * 水表型号名称
     */
    @observable
    public MeterModelName:string;

    /**
     * 备注说明
     */
    @observable
    public Description:string;


    /**
     * 排序号
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
     * 
     * @param autoId 自增id
     * @param modelId 水表型号代码
     * @param name 水表型号名称
     * @param des 备注说明
     * @param isdelete 是否删除
     */
    constructor(autoId:number=0,modelId:string="",name:string="",des:string="",isdelete:boolean=false){

        this.AutoId = autoId;
        this.MeterModelId = modelId;
        this.MeterModelName = name;
        this.Description = des;
        this.SortNo=1;
        this.CreateId="";
        this.CreateDate="";
    }

}
