import { observable } from "mobx";
import { SpecialProcessType } from "./entity";

export class SpecialProcessTypeUiStore {

    /**
     * 水表特殊型号页面中表格中的数据集合
     */
    @observable
    public list: SpecialProcessType[];

    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem: SpecialProcessType;

    /**
     * 页面是否正在加载
     */
    @observable
    public isLoading: boolean = false;

    /**
     * 最大排序号
     */
    @observable
    public maxSortNo: number;
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    /**
     * 弹出层是否是编辑状态
     */
    @observable
    public isEdit: boolean = true;
    @observable
    public CompanyNameData: any[] = []
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public isVisibleModal: boolean = false


    /**
     * 构造函数
     */
    constructor() {
        this.currentEditItem = new SpecialProcessType();
        this.list = new Array<SpecialProcessType>();
        this.isLoading = true;
        this.maxSortNo = 0;
        this.isEdit = true;

    }

    /**
     * 根据id获取集合下标
     * @param id 生产商ID
     */
    public getIndex(id: string): number {
        return this.list.findIndex((value: SpecialProcessType, index: number, list: SpecialProcessType[]) => {
            return value.MeterSpecialTypeId === id;
        })
    }

    /**
     * 根据ID对应的水表型号数据
     * @param id 项目ID
     */
    public getItem(id: string): SpecialProcessType | null {
        const index = this.getIndex(id);
        return index < 0 ? null : this.list[index];
    }


}