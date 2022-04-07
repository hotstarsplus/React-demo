import { observable } from "mobx";
import { ProductKind, ProductKindTreeData } from "./entity";



export class ProductKindUiStore {

    /**
     * 产品性质集合
     */
    @observable
    public ProductKindList: ProductKind[];

    @observable
    public BussinedId:string=''

    /**
     * 产品性质树形集合
     */
    @observable
    public ProductKindTreeList: ProductKind[];

    @observable
    public TreeData: ProductKindTreeData[];

    /** 存储cpCode */
    @observable
    public CompanyCode: string = ''

    /**
     * 正在加载
     */
    @observable
    public Loading: boolean;
    
    @observable
    public flag: boolean = true


    /**
     * 当前正在编辑的项目
     */
    @observable
    public CurrentEditItem: ProductKind;



    constructor() {
        this.CurrentEditItem = new ProductKind();
        this.Loading = false;
        this.ProductKindList = new Array<ProductKind>();
        this.ProductKindTreeList = new Array<ProductKind>();
        this.TreeData = new Array<ProductKindTreeData>();
       
    }


}