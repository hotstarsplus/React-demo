import { observable } from "mobx";

/**
 * 用户类型违约金实体接口
 */
export interface ICardTypeLateFee{
    AutoId:number,
    CardType:string,
    IsLateFee:boolean,
    IsDelete:boolean,
}

/**
 * 用户类型违约金实体
 */
export class CardTypeLateFee implements ICardTypeLateFee{
    /**
     * autoId
     */
    @observable
    public AutoId:number;

    /**
     * 编码
     */
    @observable
    public CardType:string;

    /**
     * 是否计算违约金
     */
    @observable
    public IsLateFee:boolean;

    /**
     * 是否删除
     */
    @observable
    public IsDelete:boolean;

    /**
     * 
     * @param autoId autoId
     * @param cardTypeId 编码
     * @param isLateFee 是否计算违约金
     * @param isDelete 是否删除
     */
    constructor(autoId:number=0,cardTypeId:string = "",isLateFee:boolean=true,isDelete:boolean=true){
        this.AutoId = autoId;
        this.CardType = cardTypeId;
        this.IsLateFee = isLateFee;
        this.IsDelete = isDelete;
    }

}