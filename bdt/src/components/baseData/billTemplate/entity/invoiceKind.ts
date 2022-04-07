
/**
 * 票据种类实体
 */
export class InvoiceKind {

    /**
     * 票据种类id
     */
    public InvoiceKindId: string;
    /**
     * 票据种类名称
     */
    public InvoiceKindName: string;
    /**
     * 是否自定义模板(0:否,1:是)
     */
    public IsCustomTemplate: string;

}

/**
 * 所属类型实体
 */
export class PrintTemplateType {
    /** 组织代码 */
    public CpCode: string = '';
    /** 类型id */
    public PrintTemplateTypeId: number = 0;
    /** 类型名称 */
    public PrintTemplateTypeName: string = '';
}

/**
 * 银行实体
 */
export class AgentBankList {
    /** 银行ID */
    public AgentBankId: string = '';
    /** 类型id */
    public AgentBankName: string = '';
    /** 类型名称 */
    public children: AgentBankList[] = [];
}


