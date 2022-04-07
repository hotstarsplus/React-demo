import { action, observable } from "mobx";
import { Manufacturer } from "./entity";




export class ManufacturerUiStore {

    /**
     * 生产厂家集合
     */
    @observable
    public list: Manufacturer[];
    @observable
    public Name: string = ''

    /**
     *  当前编辑的项目
     */
    @observable
    public currentEditItem: Manufacturer;

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
     *  是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    @observable
    public CompanyNameData: any[] = []
    @observable
    /** 切换的企业名称 */
    public CompanyName: string = ''
    @observable
    public InfoName: string = ''

    /**
     *  构造方法
     */
    constructor() {

        this.list = Array<Manufacturer>();

        this.currentEditItem = new Manufacturer();

        this.isLoading = true;

        this.maxSortNo = 0;



    }
   

    /**
     * 获取最大排序号
     */
    public getMaxsortNO(datas: any) {
        const arr = datas.sort((a: any, b: any) => a.SortNo - b.SortNo);

        if (datas.length > 0) {
            this.maxSortNo = arr[arr.length - 1].SortNo;
            if (this.maxSortNo !== undefined || this.maxSortNo !== 0) {
                this.maxSortNo += 1;
            } else {
                this.maxSortNo = 1;
            }
        } else {
            this.maxSortNo = 1
        }

        console.log(this.maxSortNo + "最大排序号");
    }


    /**
     * 选中的项目
     * @param id 选中项目的ID
     */
    @action
    public selectedItem(id: string): boolean {
        const item = this.getItem(id);
        if (!item || item === null) {
            return false;
        } else {
            this.currentEditItem = item;
            return true;
        }
    }


    /**
     * 验证数据
     * @param values 
     */
    public validate(values: Manufacturer): string | undefined {
        return undefined;
    }


    /**
     * 根据生产商ID获取集合中的下标
     * @param id 生产商ID
     */
    public getIndex(id: string): number {
        return this.list.findIndex((value: Manufacturer, index: number, list: Manufacturer[]) => {
            return value.ManufacturerId === id
        })
    }

    /**
     * 根据ID对应的厂商
     * @param id 项目ID
     */
    public getItem(id: string): Manufacturer | null {
        const index = this.getIndex(id);
        return index < 0 ? null : this.list[index];
    }

}