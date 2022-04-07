
/** 打印模板类型实体 */
export class AppPrintTemplateDto {
    /** 打印模板类型ID */
    public AppPrintTypeId: number;
    /** 打印模板类型名称 */
    public AppPrintTypeName: string;
    /** 打印模板 */
    public AppPrintTemplates: AppPrintTemplate[];
    public constructor() {
        this.AppPrintTypeId = 0;
        this.AppPrintTypeName = '';
        this.AppPrintTemplates = [];
    }
}
/** 打印模板 */
export class AppPrintTemplate {
    /** 模板ID */
    public TempLateId: number;
    /** 模板名称 */
    public TempLateName: string;
    /** 备注 */
    public Remark: string;
    /** 模板类型ID */
    public AppPrintTypeId: number;
    /** 绑定数据 */
    public DataSource: string;
    /** 是否启用 */
    public IsUse: string;
    /** 是否默认 */
    public IsDefault: string;
    /** 企业代码 */
    public CpCode: string;
    public constructor() {
        this.TempLateId = 0;
        this.TempLateName = '';
        this.Remark = '';
        this.AppPrintTypeId = 0;
        this.DataSource = '';
        this.IsUse = '';
        this.IsDefault = '0';
        this.CpCode = '';
    }
}


export class PrintTemplateType {
    /** 组织代码 */
    public CpCode: string = '';
    /** 类型id */
    public PrintTemplateTypeId: number = 0;
    /** 类型名称 */
    public PrintTemplateTypeName: string = '';
}



/** -------编辑打印模板实体------- */
export class PrintModal {
    public ModuleId: string;
    public ModulesName: string;
    public IsUse: string;
    public ModuleField: ModuleField[];
    public constructor() {
        this.ModuleId = ''
        this.ModulesName = '';
        this.IsUse = '';
        this.ModuleField = [];
    }
}
/** 编辑打印模板子类 */
export class ModuleField {
    /** 小标题 */
    public FieldName: string;
    /** 内容 */
    public FieldValue: string;
    /** 排序号 */
    public SortNo: number;
    public FatherId: string;
    /** 选中数据源 */
    public DataSource: AppPrintDataSource[];
    public constructor() {
        this.FieldName = '';
        this.FieldValue = '';
        this.SortNo = 0;
        this.FatherId = '';
        this.DataSource = [];
    }
}
/** 编辑打印模板数据源类型 */
export class AppPrintDataSource {
    public AutoId: number;

    public DataSourceId: string;
    /** 数据源中文名 */
    public CnName: string;
    /** 数据源英文名 */
    public EnName: string;

    public IsModule: string;

    public FatherId: string;

    public AppPrintTypeId: number;
    /** 数据源默认值 */
    public DisplayValue: string;

    public IsUse: string;

    public CpCode: string;
    public constructor() {
        this.AutoId = 0;
        this.DataSourceId = '';
        this.CnName = '';
        this.EnName = '';
        this.IsModule = '';
        this.FatherId = '';
        this.AppPrintTypeId = 0;
        this.IsUse = '';
        this.CpCode = '';
        this.DisplayValue = '';
    }
}

