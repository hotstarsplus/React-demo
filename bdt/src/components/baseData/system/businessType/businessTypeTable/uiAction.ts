import { message } from 'antd';
import { action } from 'mobx';
import { IBusinessTypeTableProps } from './interface';
/**
 * 业务视图action
 */
export class ThremBusinessUiAction {
    
    private props: IBusinessTypeTableProps;

    /**
     * 
     * 构造方法
     */
    constructor(props: IBusinessTypeTableProps) {
        this.props = props;
        this.editClick = this.editClick.bind(this);
        this.getItemId = this.getItemId.bind(this);
    }

    /**
     * 点击编辑按钮的回调方法
     * @param e 
     */
    @action
    public editClick(e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();

        const id = this.getItemId(e);

        if (id==="") {
            return;
        }
        console.log('打印',this.props.GlobalBusinesstypeStore!.CurrentEditItem)
        if (this.props.GlobalBusinesstypeStore!.selectedItem(Number(id))) {
            this.props.onEdit(this.props.GlobalBusinesstypeStore!.CurrentEditItem);
        } else {
            message.error('错误的事件参数');
        }
    }


    /**
     * 获得选择的对应的id
     * @param e 
     */
    private getItemId(e: React.SyntheticEvent<HTMLAnchorElement>): string {
        try {
            const id = e.currentTarget.getAttribute('id');
            if (!id) {
                message.error('无效的对象id');
                return "";
            }
            const ix = id.indexOf('_');
            if (ix < 0) {
                message.error('无效的对象id');
                return "";
            }
            return id.substring(ix + 1);
        } catch (error) {
            return "";
        }
    }
}