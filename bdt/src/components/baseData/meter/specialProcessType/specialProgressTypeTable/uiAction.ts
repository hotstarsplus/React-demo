import { message } from "antd";
import { action } from "mobx";
import { ISpecialProgressTypeTableProps } from "./interface";

/**
 * 水表特殊型号表格的Action
 */
export class SpecialProgressTypeTableUiAction{

    /**
     * 领域action
     */
    // private domainStore:SpecialProcessTypeUiStore;

    private props:ISpecialProgressTypeTableProps;

    constructor(props:ISpecialProgressTypeTableProps){
        this.props = props;
        // this.domainStore = props.GlobalSpecialProgressTypeStore!;
        this.getItemId = this.getItemId.bind(this);
    }



    /**
     *  编辑的回调方法
     */
    @action.bound
    public editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const id = this.getItemId(e);
        if (!id) {return;};
        if (this.SelectedItem(id)) {
            this.props.onEdit(this.props.GlobalSpecialProgressTypeStore!.currentEditItem);
        }else{
            message.error('错误的事件参数');
        }


    }

    /**
     * 选中的项目
     * @param id 水表型号的ID
     */
     @action
     public SelectedItem(id: string): boolean {
         const item = this.props.GlobalSpecialProgressTypeStore!.getItem(id);
         if (!item || item === null) {
             return false;
         } else {
            this.props.GlobalSpecialProgressTypeStore!.currentEditItem = item;
             return true;
         }
     }

    /**
     * 获取选中的ID
     */
    private getItemId(e:React.SyntheticEvent<HTMLAnchorElement>):(string | undefined){
        try{
            const id = e.currentTarget.getAttribute('id');

            if(!id){
                message.error("无效的对象id");
                return undefined;
            }

            const ix = id.indexOf('_');
            if(ix < 0){
                message.error("无效的对象id");
                return undefined;
            }
            return id.substring(ix+1);
        }catch(error){
            message.error(error.message);
            return undefined;
        }
    }
}
/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration:3
  });