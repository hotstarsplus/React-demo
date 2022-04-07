import { observable } from "mobx";
import { PayType } from "./entity";

export class PayTypeUiStore {

    /**
     * 支付方式页面中表格中的数据集合
     */
    @observable
    public list: PayType[];

    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem: PayType;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading: boolean = false;

    /**
     * 弹出层是否是编辑状态
     */
    @observable
    public isEdit: boolean = true;

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''


    /**
     * 构造函数
     */
    constructor() {
        this.currentEditItem = new PayType();
        this.list = new Array<PayType>();
        this.isLoading = true;
        this.maxSortNo = 0;
        this.isEdit = true;
    }
}