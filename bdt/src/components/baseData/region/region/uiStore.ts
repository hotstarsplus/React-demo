import { observable } from "mobx";
import { IOrganition, Region } from "./entity";

export class RegionUiStore {


    /**
     * 是否显示编辑视图
     */
    @observable
    public IsVisiableModal: boolean;

    /**
     * 数据集合
     */
    @observable
    public RegionList: Region[];


    /**
     * ui数据集合
     */
    @observable
    public UiRegionList: Region[];

    /**
     * 当前正在编辑的片区
     */
    @observable
    public CurrentEditRegion: Region;

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

    /**
     * 公司树下拉组件
     */
    @observable
    public CompanyNameData: IOrganition[];

    /**
     * 最大排序号
     */
    public maxSortNo: number;


    /**
     * 构造
     */
    constructor() {
        this.UiRegionList = [];
        this.IsVisiableModal = false;
        this.RegionList = Array<Region>();
        this.CurrentEditRegion = new Region();
        this.SelectorDisabled = false;
        this.IsLoading = false;
        this.maxSortNo = 0;
    }
    
}