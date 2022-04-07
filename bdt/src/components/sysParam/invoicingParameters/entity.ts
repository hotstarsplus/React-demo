
export class SourceInvoiceingParameters {
    public CpCode: string = '';
    public DefineRemark: string = '';
    public IsDelete: string = '';
    public ReMarkId: number = 1;
    public RemarkFieldId: number = 1;
    public RemarkField: string = '';
    public SortNo: number = 1;
    public InvoiceKindId:string='';
}

export class SourceList {
    public FieldId: number;
    public FieldCnName: string;
}

export class FieldNameList {
    public key: string;
    public FieldName: string;
}

export class InvoiceKind {
    public CpCode: string = '';
    public InvoiceKindId: string = '';
    public InvoiceKindName: string = '';
    public FatherId: string = '';
    public MaxAmount: number = 0;
    public IsPaper: string = '';
    public IsInvoice: string = '';
    public IsFormal: string = '';
    public InvoiceApiId: string = '';
    public IsGetBill: string = '';
    public IsPickBill: string = '';
    public IsCustomTemplate: string = '';
    public IsPrint: string = '';
    public CreaterId: string = '';
    public UpdaterId: string = '';
    public UpdateDate: string = '';
    public CreateDate: string = '';
    public IsDelete: string = '';
}

