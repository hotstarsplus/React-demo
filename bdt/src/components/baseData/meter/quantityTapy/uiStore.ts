import { observable } from 'mobx';
import { QuantityTapy } from './entity';

/**
 * 水量类型Store 为QuantityTapyView所使用
 */
export class QuantityTapyUiStore {
    /**
     * 项目集合
     */
    @observable
    public list: QuantityTapy[];
    /**
     * 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容。
     */
    @observable
    public currentEditItem: QuantityTapy;
    /**
     * 是否正在加载
     */
    @observable
    public isLoading: boolean;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;
    @observable
    public CompanyNameData: any[] = []
    /**
     * 数据条数
     */
    @observable
    public dataLength: number;
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    /**
     *  构造方法
     */
    constructor() {
        this.list = Array<QuantityTapy>();
        this.currentEditItem = new QuantityTapy();
        this.maxSortNo = 0;
        this.dataLength = 0;
        this.isLoading = false;
    }

}