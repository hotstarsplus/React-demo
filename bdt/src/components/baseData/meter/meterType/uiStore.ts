import { action, observable } from "mobx";
import { MeterType, MeterTypeUiEntity } from "./entity";



export class MeterTypeUiStore {
    /** 是否显示编辑视图 */
    @observable
    public isVisiableModal: boolean;
    /** 水表类型UI数据数组 */
    @observable
    public MeterTypeUiList: MeterTypeUiEntity[];
    /** 用于增加、修改、删除时使用，将变化之后的数组提供给MeterTypeList使用 */
    public list: MeterType[];
    /** 用于查询后使用，将变化之后的数组提供给MeterTypeList使用 */
    public searchList: MeterType[];
    /**  ui层数据数组(水表类型数组) */
    @observable
    public MeterTypeList: MeterType[];
    /** 当前正在编辑的水表类型 */
    @observable
    public CurrentEditMeterType: MeterType;
    /** 是否正在加载 */
    @observable
    public IsLoading: boolean;
    /** 下拉选控件是否禁用 */
    @observable
    public SelectorDisabled: boolean;
    /** 最大排序号 */
    @observable
    public maxSortNo: number;
    /** 名称 */
    @observable
    public pKeyName: string;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    /** 输入的编码 */
    @observable
    public InputCode: string = ''
    /** 输入的水表类型名称 */
    @observable
    public InputTypeName: string = ''
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public MeterTypeUiLists: MeterTypeUiEntity[] = [];

    /** 构造方法 */
    constructor() {

        this.MeterTypeUiList = new Array<MeterTypeUiEntity>();

        this.MeterTypeList = new Array<MeterType>();

        this.searchList = new Array<MeterType>();

        this.CurrentEditMeterType = new MeterType();

        this.isVisiableModal = false;

        this.maxSortNo = 0;

        this.pKeyName = "";

    }

    public refreshUis=(jsonData: MeterType[])=> {
        const data = this.recursion(jsonData as MeterType[]);
        this.MeterTypeUiLists=data;

    }


    /**
     * 新增刷新UI
     */
    @action.bound
    public refreshUi(jsonData: MeterType[]) {
        const data = this.recursion(jsonData as MeterType[]);
        this.MeterTypeUiList=data;
    }

    /**
     * 递归转换数据
     * @param list 接口json数据集合
     */
    @action.bound
    public recursion(list: MeterType[]): MeterTypeUiEntity[] {
        const wsList = new Array<MeterTypeUiEntity>();
        if (list) {
            list.forEach((jsonmodel: MeterType, index: number, array: MeterType[]) => {
                const model = new MeterTypeUiEntity();
                model.key = jsonmodel.MeterTypeId;
                model.value = jsonmodel.MeterTypeId;
                model.title = jsonmodel.MeterTypeName;
                model.FatherId = jsonmodel.FatherId;
                model.SortNo = jsonmodel.SortNo;
                model.UpdateDate = jsonmodel.UpdateDate;
                model.UpdaterId = jsonmodel.UpdaterId;
                model.CreateDate = jsonmodel.CreateDate;
                model.CreaterId = jsonmodel.CreaterId;
                model.Description = jsonmodel.Description;
                model.CpCode =jsonmodel.CpCode;
                if (jsonmodel.children && jsonmodel.children.length > 0) {
                    model.children = this.recursion(jsonmodel.children);
                } else {
                    model.children = undefined;
                }
                wsList.push(model);
            })
        }
        return wsList;
    }

}



