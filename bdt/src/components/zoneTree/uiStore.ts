import { observable } from "mobx";
import { OridStores } from "orid";

export class ZoneTreeUiStore{
    /** 默认选中的组织类型 */
    @observable public selectType: string = '区段'
    /** uiType1 设定下的组件 */
    @observable public uiTypeRefs1: HTMLDivElement | null = null
    /** uiType2 设定下的组件 */
    @observable public uiTypeRefs2: HTMLDivElement | null = null
    /** uiType3 设定下的组件 */
    @observable public uiTypeRefs3: HTMLDivElement | null = null
    /** 默认的选中组织 */
    @observable public Organization: string;
    /** 点击区段树 topsearch回调 */
    @observable public handlePanelChange: (value: string) => void;
    /** */
    @observable public rightPanelChange: (value: string) => void;
    /** */
    @observable public ChangeValue: (value: string) => void
    /** 树节点的选择事件 */
    @observable public OnSelectedChange: (value: string[]) => void
    /** */
    @observable public OnSelectedChanges: (value: string[]) => void
    /** 区段树 下拉数据 */
    @observable public OrganizationData: any[];
    /** 区段树 下拉数据 */
    @observable public OrganizationChild: any[];
    /** 临界高度 */
    @observable public frontageHeight: number;
    /** 高度使用 */
    @observable public zoneTreeHeight: number;
    /** 高度使用 */
    @observable public treeDom: HTMLDivElement | null;
    /** 高度使用 */
    @observable public treeClass: string;
    /** 区段树配置 实体 */
    @observable public zoneTreeConfig: {};
    /** 区段树是否可选择全部 配置 */
    @observable public thenShowTitle: string;
    /** 区段树高度 缓存 */
    @observable public zoneTreeHeightCalcCache: {
        type?: "uiType_1" | "uiType_2" | "uiType_3",
        props?: any
    };
    constructor() {
        this.zoneTreeHeight = 0;
        this.frontageHeight = 0;
        this.thenShowTitle = "";
        if ( !this.Organization ) { this.Organization = OridStores.authStore.currentOperator.CpCode };
        this.OrganizationData = new Array();
        this.OrganizationChild = new Array();
        this.zoneTreeConfig = {IsAllShowGardenRootNode: false,IsAllShowRegionRootNode: false};
        this.zoneTreeHeightCalcCache = {

        }
    }
    
}