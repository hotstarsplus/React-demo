import { message } from 'antd';
import { action } from 'mobx';
import { IPayTypeTableProps } from "./interface";


/**
 *  支付方式的Action
 */
export class PayTypeTableUiAction{

    private props:IPayTypeTableProps;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IPayTypeTableProps){
        
        this.props = props;
    }

    /**
     * 点击编辑按钮的回调方法
     */
    @action.bound
    public editClick(e: React.SyntheticEvent<HTMLAnchorElement>){

        e.preventDefault();

        const id = this.getItemId(e);
        
        if (!id) {return;};
        const iid=String(id);
        if (this.props.SelectedItem(iid)) {
            this.props.onEdit(this.props.GlobalPayTypeStore!.currentEditItem);
        }else{
            message.error('错误的事件参数');
        }

    }

    /**
     * 获取选中支付方式的ID
     * @param e 
     */
    @action.bound
    public getItemId(e: React.SyntheticEvent<HTMLAnchorElement>):(string | undefined) {
        try
        {
            const id = e.currentTarget.getAttribute('id');

            if (!id) {
                message.error("无效的对象id");
                return undefined;
            }

            const ix = id.indexOf('_');
            if (ix < 0) {
                message.error('无效的对象id');
                return undefined;
            }

            return  id.substring(ix + 1);

        }catch(error){
            message.error(error.message);
            return undefined;
        }
    }

    /**
     * 设置行样式
     * @param record 
     * @param index 
     */
    @action.bound
     public setRowClassName(record: any, index: number):string{
        return "tr-class";
    }


}
/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration:3
  });