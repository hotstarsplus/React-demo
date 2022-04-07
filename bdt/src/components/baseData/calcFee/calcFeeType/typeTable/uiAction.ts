import { message } from "antd";
import { action } from "mobx";
import { CalcFeeTypeUiStore } from "../uiStore";
import { ICalcFeeTypeTableViewProps } from "./interface";




/**
 * 计费方式列表视图action
 */
export class CalcFeeTypeTableUiAction{
    
    private props:ICalcFeeTypeTableViewProps;
    /**
     * 领域action
     */
    private domainStore:CalcFeeTypeUiStore;

    constructor (props:ICalcFeeTypeTableViewProps){
        this.props=props;
        this.domainStore = props.GlobalCalcFeeTypeStore!;
        this.editClick=this.editClick.bind(this);
        this.getItemId=this.getItemId.bind(this);
    }

    /**
     * 点击编辑按钮时的回调方法
     */
    @action
    public editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const id=this.getItemId(e);
        if(!id){return;}
        if(this.props.selectItem(id)){
            this.props.onEdit(this.domainStore.currentEditItem);
        }else{
            message.error("错误的事件参数");
        }
    }

    /**
     * 获取选择的对应的id
     */

     private getItemId(e:React.SyntheticEvent<HTMLAnchorElement>):(string|undefined){
         const id=e.currentTarget.getAttribute('id');
         if(!id){
             message.error("无效的对象id");
             return undefined;
         }
         const ix=id.indexOf("_");
         if(ix<0){
             message.error("无效的对象id");
             return undefined;
         }

         try{
             return id.substring(ix+1);
         }catch(error){
             const err:Error=error;
             message.error(err.message);
             return  undefined;
         }
     }
}
