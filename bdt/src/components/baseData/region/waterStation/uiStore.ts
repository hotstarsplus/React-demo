import { observable } from "mobx";
import { WaterStation, WaterStationUiEntity } from "./entity";




export class WaterStationUiStore {
    /** 打开的是否为编辑弹出层 */
    @observable
    public isEditModal: boolean = false
    /**
     * 操作类型
     */
    @observable
    public operatorType: "add" | "update";

    /**
     * 供水所上级名称保存
     */
    @observable
    public highName: string;

    /**
     * 供水所UI数据集合
     */
    @observable
    public WaterStationUiList: WaterStationUiEntity[];

    /**
     * ui层数据数组
     */
    @observable
    public WaterStationList: WaterStation[];


    /**
     * 当前正在编辑的供水所
     */
    @observable
    public CurrentEditWaterStation: WaterStation;

    /**
     * 是否正在加载
     */
    @observable
    public IsLoading: boolean;
    @observable
    public CompanyName: string = ''
    @observable
    public InputCode: string = ''
    @observable
    public InputAddress: string = ''
    @observable
    public InputLinkName: string = ''
    @observable
    public InputTypeName: string = ''


    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled: boolean;

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;

    /**
     * 名称
     */
    @observable
    public pKeyName: string;
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public WaterStationUiLists: any[] = []


    /**
     * 用于增加、修改、删除是使用，将变化之后的数组提供给WaterStationList使用
     */
    public list: WaterStation[];
    /**
     * 用于查询后使用，将变化之后的数组提供给WaterStationList使用
     */
    public searchList: WaterStation[];

    /**
     * 构造
     */
    constructor() {

        this.WaterStationList = Array<WaterStation>();

        this.CurrentEditWaterStation = new WaterStation();

        this.WaterStationUiList = new Array<WaterStationUiEntity>();

        this.IsLoading = true;

        this.SelectorDisabled = false;

        this.list = Array<WaterStation>();

        this.searchList = Array<WaterStation>();

        this.pKeyName = "";
    }

    


}