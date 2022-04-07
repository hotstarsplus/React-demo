import { observable } from 'mobx';
import { MeterCaliber } from './entity';


/**
 * 水表口径Store 为MeterCaliberView所使用
 */
export class MeterCaliberUiStore {
    /** 项目集合 */
    @observable
    public list: MeterCaliber[];
    /** 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容 */
    @observable
    public currentEditItem: MeterCaliber;
    /** 是否正在加载 */
    @observable
    public isLoading: boolean = true;
    /** 最大排序号 */
    @observable
    public maxSortNo: number;
    /** 数据的条数 */
    public dataLength: number;
    @observable
    public CompanyName: string = ''
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public isVisiableModal: boolean = false

    /**
     *  构造方法
     */
    constructor() {

        this.list = Array<MeterCaliber>();
        this.currentEditItem = new MeterCaliber();
        this.getIndex = this.getIndex.bind(this);
        this.refreshUi = this.refreshUi.bind(this);
        this.maxSortNo = 0;
        this.dataLength = 0;
    }

    /**
     * 验证数据
     * @param values 
     */
    public validate(values: MeterCaliber): string | undefined {
        return undefined;
    }

    /**
     * 刷新页面ui
     */
    public refreshUi(jsonList: MeterCaliber[]) {
        const datas = jsonList as MeterCaliber[];
        this.list.splice(0, this.dataLength);
        this.dataLength = datas.length;
        this.list = datas;
    }

    /**
     * 查找指定id的项目的在集合中的索引
     * @param id {string} id 项目的id
     * @returns {number} 项目的索引
     */
    public getIndex(id: string): number {
        return this.list.findIndex((item: MeterCaliber, index: number, items: MeterCaliber[]) => {
            return item.MeterCaliberId === id;
        });
    }
}