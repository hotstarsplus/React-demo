import {observable} from 'mobx';


export interface ICardTypeCopyDate{
    AutoId:number;
    CardTypeId:string;
    CopyDayBegin:number;
    CopyDayEnd:number;
    IsDelete:boolean;
}

export class CardTypeCopyDateModel implements ICardTypeCopyDate{
    @observable
    public AutoId:number;

    @observable
    public CardTypeId:string;

    @observable
    public CopyDayBegin:number;

    @observable
    public CopyDayEnd:number;

    @observable
    public IsDelete:boolean;

    /**
     * 
     * @param autoid 
     * @param cardTypeId 
     * @param copyDayBegin 
     * @param copyDayEnd 
     * @param isDelete 
     */
    constructor(autoid:number=-1,cardTypeId:string='',copyDayBegin:number=-1,copyDayEnd:number=-1,isDelete:boolean=true){
        this.AutoId=autoid;
        this.CardTypeId=cardTypeId;
        this.CopyDayBegin=copyDayBegin;
        this.CopyDayEnd=copyDayEnd;
        this.IsDelete=isDelete;
    }
}