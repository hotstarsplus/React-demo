import { observable } from "mobx";
import { Residence } from "./entity";


export class ResidenceUiStore {
    /** 是否打开的是编辑弹出层 */
    @observable
    public isEditModal: boolean = false
    /**
     * 当前正在编辑的小区
     */
    @observable
    public CurrentEditResidence: Residence;

    /**
     * 正在加载
     */
    @observable
    public Loading: boolean;

    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled: boolean;
    @observable
    public InfoName: string = ''


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
    public ResidenceList: Residence[];
    @observable
    public CompanyName: string = ''
    @observable
    public InputTypeName: string = ''
    @observable
    public InputCode: string = ''
    @observable
    public InputAddress: string = ''
    @observable
    public Name: string = ''
    @observable
    public CompanyNameData: any[] = []
    @observable
    public isVisibleModal: boolean = false
    /**
     * 企业代码
     */
    @observable
    public cpCode: string;
    /**
     * 构造方法
     */
    constructor() {

        this.cpCode="";

        this.CurrentEditResidence = new Residence();

        this.ResidenceList = new Array<Residence>();

        this.Loading = true;

        this.maxSortNo = 0;

        this.pKeyName = "";

    }
  
    

   

   

    
}