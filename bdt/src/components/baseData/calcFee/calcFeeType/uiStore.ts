import { observable } from "mobx";
import { CalcFeeType } from "./entity";

/**
 * 计费方式方法
 */
export class CalcFeeTypeUiStore {
    /**
     * 表格数据集合
     */
    @observable
    public list: CalcFeeType[];
    @observable
    public listByBusinessType: CalcFeeType[];
    /**
     * 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容。
     */
    @observable
    public currentEditItem: CalcFeeType;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    @observable
    public CompanyNameData: any[] = [];
    @observable
    public cpCode: string = '';
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading: boolean;
    constructor() {
        this.isLoading = false;
        this.list = new Array<CalcFeeType>();
        this.currentEditItem = new CalcFeeType();
        this.listByBusinessType = new Array<CalcFeeType>();
    }
   
}