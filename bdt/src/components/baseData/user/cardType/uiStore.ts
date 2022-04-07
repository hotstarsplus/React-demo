import { observable } from 'mobx';
import { CardType } from './entity';


export class CardTypeUiStore {
    /** 下拉选控件是否禁用 */
    @observable
    public SelectorDisabled: boolean;
    /** 水卡类型数组 用于外层ui的使用 */
    @observable
    public CardTypeList: CardType[];
    @observable
    public CardTypeUiList: CardType[] = [];
    /** 输入的水卡类型名称 */
    @observable
    public InputTypeName: string = ''
    /** 切换的企业名称 */
    @observable
    public CompanyName: string = ''
    /** 输入的编码 */
    @observable
    public InputCode: string = ''
    /** 当前正在编辑的水卡类型 */
    @observable
    public currentEditCardType: CardType;
    @observable
    public CompanyNameData: any[] = []
    /** 是否加载 */
    @observable
    public isLoading: boolean = true;
    /** 最大排序号 */
    @observable
    public maxSortNo: number;
    @observable
    public InfoName: string = ''
    @observable
    public Name: string = ''
    @observable
    public isVisibleModal: boolean = false

    constructor() {

        this.CardTypeList = Array<CardType>();

        this.currentEditCardType = new CardType();

        this.isLoading = true;

        this.maxSortNo = 0;
    }
}