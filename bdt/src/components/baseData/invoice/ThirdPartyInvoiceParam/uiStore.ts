import { observable } from "mobx";
import { ITaxPreCon, ITaxRate, ThirdPartyInvoiceParam } from "./entity";


export class ThirdPartyInvoiceParamUiStore {

    /** 数据源 */
    @observable
    public List: ThirdPartyInvoiceParam[];
    @observable
    public id: string = ''
    @observable
    public name: string
    /** 是否正在加载 */
    @observable
    public Loading: boolean;
    /** 当前编辑的项目 */
    @observable
    public CurrentEditItem: ThirdPartyInvoiceParam;
    /** 表格选中ID */
    @observable
    public TableSelectedRowKeys: string[];
    @observable
    public LeftTreeData: any[];
    /** 表格选中行 */
    @observable
    public TableSelectedRows: ThirdPartyInvoiceParam[];
    @observable
    public CompanyCpCode: string;
    /** 税率 */
    @observable
    public TaxRateList: ITaxRate[];
    /** 优惠政策类型 */
    @observable
    public TaxPreConList: ITaxPreCon[];
    @observable
    public IsSelected: boolean;

    public maxSortNo:number=0;

    constructor() {
        this.id = "";
        this.name = "";
        this.Loading = false;
        this.IsSelected = true;
        this.LeftTreeData = [];
        this.CompanyCpCode = "";
        this.TableSelectedRows = [];
        this.TableSelectedRowKeys = [];
        this.TaxRateList = new Array<ITaxRate>();
        this.TaxPreConList = new Array<ITaxPreCon>();
        this.List = new Array<ThirdPartyInvoiceParam>();
        this.CurrentEditItem = new ThirdPartyInvoiceParam();
    }
}



