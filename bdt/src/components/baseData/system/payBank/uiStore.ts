import { observable } from "mobx";
import { PayBank, PayBankUiEntity } from "./entity";


export class PayBankUiStore {
    /** 是否打开编辑弹出层 */
    @observable
    public isEditModal: boolean = false
    /** 当前正在编辑的银行 */
    @observable
    public CurrentEditPayBank: PayBank;
    /** 输入的开户行名称 */
    @observable
    public InputTypeName: string = ''
    /** 输入的编码 */
    @observable
    public InputCode: string = ''
    /** 切换的公司名称 */
    @observable
    public CompanyName: string = ''
    /** 输入的账号 */
    @observable
    public InputAccount: string = ''
    /** 正在加载 */
    @observable
    public Loading: boolean;
    /** 下拉选控件是否禁用 */
    @observable
    public SelectorDisabled: boolean;
    /** 扣费银行UI数据数组 */
    @observable
    public PayBankTypeUiList: PayBankUiEntity[];
    @observable
    public PayBankTypeUiLists: PayBankUiEntity[] = [];
    /** ui层数据数组(扣费银行数组)  */
    @observable
    public PayBankTypeList: PayBank[];
    /** 最大排序号 */
    @observable
    public maxSortNo: number;
    @observable
    public fatherid: string = '';
    /** 用于增加、修改、删除使用，将变化之后的数组提供给PayBankTypeList使用 */
    public list: PayBank[];
    /** 名称 */
    @observable
    public pKeyName: string;
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public isVisibleModal: boolean = false
    /** 构造方法 */
    constructor() {
        this.PayBankTypeUiList = new Array<PayBankUiEntity>();
        this.PayBankTypeList = new Array<PayBank>();
        this.CurrentEditPayBank = new PayBank();
        this.list = Array<PayBank>()
        this.Loading = true;
        this.maxSortNo = 0;
        this.pKeyName = "";
    }














}



