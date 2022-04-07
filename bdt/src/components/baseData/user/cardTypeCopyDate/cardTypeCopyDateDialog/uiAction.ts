import { CardTypeCopyDateFormUiAction } from '../cardTypeCopyDateForm/uiAction'
import { ICardTypeCopyDateDiaLogProps } from './interface';


export class CardTypeCopyDateDialogUiAction{
    /**
     * 当前组建的api接口
     */
    private props:ICardTypeCopyDateDiaLogProps;

    private sonFormUiAction:CardTypeCopyDateFormUiAction;

    constructor(props:ICardTypeCopyDateDiaLogProps){
        this.props=props;
        this.handleOk=this.handleOk.bind(this);
        this.getSonUiAction=this.getSonUiAction.bind(this);
    }

    public getSonUiAction(sonUiAction:CardTypeCopyDateFormUiAction){
        console.log("CardTypeCopyDateDialog.getSonUiAction")
        this.sonFormUiAction=sonUiAction;
    }

    public handleOk(){
        const result=this.sonFormUiAction.validate();
        if(!result.isValidated){return;}
        this.props.handleOk(result.formData);
    }
}