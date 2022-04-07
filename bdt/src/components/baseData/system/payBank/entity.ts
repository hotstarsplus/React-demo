import { observable } from "mobx";

/**
 * 银行表实体接口
 */
export interface IPayBank{

    /**
     * 自增Id
     */
    AutoId:number;

    /**
     * 银行编码
     */
    AgentBankId:string;

    /**
     * 开户行名称
     */
    AgentBankName:string;

    /**
     * 父级Id
     */
    FatherId:string;

    /**
     * 帐号
     */
    AgentBankAccount:string;

    /**
     * Email
     */
    AgentBankEmail:string;

    /**
     * 备注说明
     */
    Description:string;

    /**
     * 排序号
     */
    SortNo:number;

    /**
     * 子集集合
     */
    children?:PayBank[];

    /**
     * 创建时间
     */
     CreateDate:string;

    /**
     * 创建人
     */
     CreateId:string;
}

/**
 * 银行表实体
 */
export class PayBank implements IPayBank {
    
    /**
     * 自增Id
     */
    @observable
    public AutoId:number;

    @observable
    public CpCode:string=''
    
    /**
     * 银行编码
     */
    @observable
    public AgentBankId:string;
    
    /**
     * 开户行名称
     */
    @observable
    public AgentBankName:string;
    
    /**
     * 父级Id
     */
    @observable
    public FatherId:string;
    
    /**
     * 帐号
     */
    @observable
    public AgentBankAccount:string;
    
    /**
     * Email
     */
    @observable
    public AgentBankEmail:string;
    
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
     * 是否删除
     */
    @observable
    public isDelete:string;

    /**
     * 子集集合
     */
    @observable
    public children:PayBank[];

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

    constructor(){
        this.AgentBankId = "";
        this.AutoId = 1;
        this.AgentBankName = "";
        this.FatherId = "";
        this.AgentBankAccount = "";
        this.AgentBankEmail = "";
        this.Description = "";
        this.SortNo = 0;
        this.children = new Array<PayBank>();
        this.CreateDate="";
        this.CreateId="";
    }
}
export class PayBankUiEntity{
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
     * 银行编码
     */
    public AgentBankId:string;

    /**
     * 开户行名称
     */
    public AgentBankName:string;

    /**
     * 帐号
     */
    public AgentBankAccount:string;

    /**
     * Email
     */
    public AgentBankEmail:string;

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
    public children?:PayBankUiEntity[];
}