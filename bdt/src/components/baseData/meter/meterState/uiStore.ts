import { observable } from 'mobx';
import { MeterState } from "./entity";



/**
 *  水表状态store
 */
export class MeterStateUiStore {

    /**
     * 水表状态集合
     */
    @observable
    public list: MeterState[];

    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem: MeterState;

    /**
     * 是否正在加载
     */
    @observable
    public isLoading: boolean;

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;

    /**
     * 弹出层是否是编辑状态
     */
    @observable
    public isEdit: boolean = true;
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


    /**
     *  构造方法
     */
    constructor() {
        this.list = Array<MeterState>()
        this.currentEditItem = new MeterState();
        this.isLoading = true;
        this.maxSortNo = 0;
        this.isEdit = true;
    }

    

   



    

    

}