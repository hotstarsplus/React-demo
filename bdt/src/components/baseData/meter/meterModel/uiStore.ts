import { observable } from "mobx";
import { MeterModel } from "./entity";

export class MeterModelUiStore {
    /** 水表类型集合 */
    @observable
    public list: MeterModel[];
    /** 是否处于加载状态 */
    @observable
    public isLoading: boolean;
    /** 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容。 */
    @observable
    public currentEditRow: MeterModel;
    /** 最大排序号 */
    @observable
    public maxSortNo: number;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public isVisibleModal: boolean = false
    /** 数据条数 */
    public dataLength: number;
    constructor() {
        this.list = new Array<MeterModel>();
        this.currentEditRow = new MeterModel();
        this.refreshUi = this.refreshUi.bind(this);
        this.maxSortNo = 0;
        this.dataLength = 0;
    }

    /** 刷新页面 */
    public refreshUi(jsonList: MeterModel[]) {
        const datas = jsonList as MeterModel[];
        this.list.splice(0, this.dataLength);
        this.dataLength = datas.length;
        this.list = datas;
    }



}