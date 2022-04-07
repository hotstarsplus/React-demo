
/**
 * 水卡类型接口
 */
export interface ICardType{
    AutoId:number;
    CardTypeId:string;
    CardTypeName:string;
    FatherId:string;
    Description:string;
    SortNo:number;
    children?:CardType[];
    CreateDate:string;
    CreateId:string;
}
/**
 * 水卡类型实体类
 */
export class CardType implements ICardType{
    
    /**
     * 自增编码
     */
    public AutoId:number;

    public CpCode?:string=''

    /**
     * 水卡类型代码
     */
    public CardTypeId:string;

    /**
     * 水卡类型名称
     */
    public CardTypeName:string;

    /**
     * 上级Id
     */
    public FatherId:string

    /**
     * 描述
     */
    public Description:string;

    /**
     * 序号
     */
    public SortNo:number;

    /**
     * 子集合
     */
    public children?:CardType[];


    /**
     * 创建时间
     */
    public CreateDate:string;

    /**
     * 创建人
     */
    public CreateId:string;

    /**
     * 构造方法
     */
    constructor(){
        this.AutoId=0;
        this.CardTypeId="";
        this.CardTypeName="";
        this.FatherId="";
        this.Description="";
        this.SortNo=1;
        this.children=new Array<CardType>();
        this.CreateDate="";
        this.CreateId="";
    }
}
