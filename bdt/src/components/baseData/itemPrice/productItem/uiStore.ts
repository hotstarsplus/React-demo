import { observable } from 'mobx';
import { ProductItem } from './entity';


/**
 * 水费项目Store.为WaterRateItemView所使用
 */
export class ProductItemUiStore {

    /**
     * 项目集合
     */
    @observable
    public list: ProductItem[];
    @observable
    public CompanyCpCode:string=''

    /**
     *  下拉选控件是否禁用
     */
    @observable
    public SelectorDisabled:boolean;

    /**
     * 当前选择的用于预览或编辑的项目。当改变这个值时，ui界面中应该显示此项目的内容。
     */
    @observable
    public currentEditItem: ProductItem;

    @observable
    public isLoading: boolean = false;


    constructor() {

        this.list = Array<ProductItem>();

        this.currentEditItem = new ProductItem();

    }





}
