import { WrappedFormUtils } from "antd/lib/form/Form";
import { observable } from "mobx";
import { AppPrintDataSource, AppPrintTemplate, AppPrintTemplateDto, PrintModal } from "./entity";

export class PrintTemplateUiStore {
    /** 加载中 */
    @observable
    public cardLoading: boolean;
    /** 种类列表 */
    @observable
    public KindList: AppPrintTemplateDto[];
    /** 控制新增接口显示 */
    @observable
    public addVisible: boolean;
    /** 各个对话框的默认值 */
    @observable
    public defaultValue: AppPrintTemplate;
    /** 模板编辑显示的id */
    @observable
    public ShowTempId: string;
    /** 表单工具 */
    @observable
    public FormUtils: WrappedFormUtils
    /** 新增、编辑请求体 */
    @observable
    public request: AppPrintTemplate
    /** 控制编辑对话框 */
    @observable
    public editVisible: boolean;
    /** 控制复制模板对话框显示 */
    @observable
    public copyVisible: boolean;
    /** 选择的模板类型 */
    @observable
    public selectType: string;
    /** 一类打印模板 */
    @observable
    public singlePrintType: AppPrintTemplateDto[];
    /** 获取模板名称 */
    @observable
    public templateName: string;
    /** 获取模板名称 */
    @observable
    public templateId: number;
    /** 控制模板编辑对话框显示 */
    @observable
    public templateEditVisible: boolean;
    /** 打印模板设置数据 */
    @observable
    public templateData: PrintModal[];
    /** 源数据 */
    @observable
    public source: string;
    /** 数据源 */
    @observable
    public dataSource: AppPrintDataSource[]

    public constructor() {
        this.KindList = [];
        this.templateId = 0;
        this.ShowTempId = '';
        this.selectType = '';
        this.templateName = '';
        this.templateData = [];
        this.singlePrintType = [];
        this.copyVisible = false
        this.cardLoading = false;
        this.addVisible = false;
        this.editVisible = false;
        this.cardLoading = false;
        this.templateEditVisible = false;
        this.request = new AppPrintTemplate();
        this.defaultValue = new AppPrintTemplate();
    }
}