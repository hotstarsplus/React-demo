import { observable } from "mobx";
import { BusinessOffice, BusinessOfficeUiEntity } from "./entity";




export class BusinessOfficeUiStore {
    /**
     * 企业代码
     */
    @observable
    public cpCode: string;
    /** 是否打开的编辑弹出层 */
    @observable
    public isEditModal: boolean = false

    /**
     * ui层数据数组
     */
    @observable
    public BusinessOfficeList: BusinessOffice[];

    /**
     * 营业区ui数据集合
     */
    @observable
    public BusinessOfficeUiList: BusinessOfficeUiEntity[];

    /**
     * 当前正在编辑的营业网点
     */
    @observable
    public CurrentEditBusinessOffice: BusinessOffice;

    /**
     * 是否正在加载
     */
    @observable
    public IsLoading: boolean;


    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled: boolean;
    @observable
    public listData: any[] = []
    @observable
    public listDatas: any[] = []

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    /** 输入的编码 */
    @observable
    public InputCode: string = ''
    /** 输入的供水所名称 */
    @observable
    public InputTypeName: string = ''
    /** 输入的地址 */
    @observable
    public InputAddress: string = ''
    /** 输入的联系人 */
    @observable
    public InputlinkName: string = ''
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public isVisibleModal: boolean = false

    /**
     * 名称
     */
    @observable
    public pKeyName: string;

    /**
     * 用于增加、修改、删除是使用，将变化之后的数组提供给BusinessOfficeList使用
     */
    public list: BusinessOffice[];

    /**
     * 用于查询后使用，将变化之后的数组提供给BusinessOfficeList使用
     */
    public searchList: BusinessOffice[];

    /**
     * 构造
     */
    constructor() {
        this.cpCode = "";

        this.BusinessOfficeList = Array<BusinessOffice>();

        this.BusinessOfficeUiList = Array<BusinessOfficeUiEntity>();

        this.list = Array<BusinessOffice>();

        this.searchList = Array<BusinessOffice>();

        this.CurrentEditBusinessOffice = new BusinessOffice();

        this.IsLoading = false;

        this.SelectorDisabled = false;

        this.pKeyName = "";

    }

}