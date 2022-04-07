

/**
 * 票据打印模板数据
 */
export class BillPrintTempLate{

    /**
     * 打印模板名称
     */
    public Name: string;
    /**
     * 打印类型
     */
    public Type: string;
    /**
     * html打印模板
     */
    public HtmlSource: string
    /**
     * 旧的票据类型
     */
    public OldBillTypeId: string;
    /**
     * 单据类型
     */
    public BillTypeId: string;
    /**
     * 打印模板
     */
    public PrintTempLateId: number
    /**
     * 备注
     */
    public Description: string
    /**
     * 组织代码
     */
    public CpCode: string
    /**
     * 是否是默认模板(0:否，1：是)
     */
    public IsDefault: string
    /**
     * 是否是默认模板发生变化
     */
    public IsDefaultChange: boolean
    /**
     * 模板是否启用(0:禁用，1：启用)
     */
    public IsTurnOn:string;

    public AgentBankId:string;

    public OldAgentBankId:string;

    constructor(){
        this.Name = "";
        this.BillTypeId = "";
        this.CpCode = "";
        this.Description = "";
        this.HtmlSource = "";
        this.IsDefault = "0";
        this.IsDefaultChange = false;
        this.IsTurnOn = "1";
        this.OldBillTypeId = "";
        this.Type = "";
        this.AgentBankId='';
        this.OldAgentBankId='';
    }
}
