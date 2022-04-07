import { action } from "mobx";
import { ITopAdd } from ".";
import { AppPrintTemplate } from "../entity";

export class TopAddUiAction {

    public props:ITopAdd;

    public constructor(props:ITopAdd){
        this.props = props;
    }
    
    /** 打开新增模板对话框 */
    @action.bound
    public openAddModal(){
        this.props.PrintTemplateUiStore!.defaultValue = new AppPrintTemplate();
        this.props.PrintTemplateUiStore!.addVisible = true;
    }
}