import { message } from 'antd';
import { IControlTypeTableProps } from "./interface";

/**
 * 控制方式的Action
 */
export class ControlTypeTableViewUiAction {
    private props: IControlTypeTableProps
    constructor(props: IControlTypeTableProps) {
        this.props = props;   

        this.loadData = this.loadData.bind(this);

        this.deleteClickhandle = this.deleteClickhandle.bind(this);

        this.editClickhandle = this.editClickhandle.bind(this);

        this.getItemId = this.getItemId.bind(this);
    }
    /**
     * 默认加载数据
     */
    public loadData() {
        this.props.GlobalControlTypeStore!.loadData();
    }
    /**
     * 点击编辑按钮的回调方法
     */
    public editClickhandle(event: React.SyntheticEvent<HTMLAnchorElement>) {
        event.preventDefault();
        const id = this.getItemId(event);

        if (!id) {
            return;
        }
        const iid = String(id)
        if (this.props.GlobalControlTypeStore!.selectedItem(iid)) {
            this.props.onEdit(this.props.GlobalControlTypeStore!.currentEditItem);
        } else {
            message.error("错误的事件参数");
        }
    }
    /**
     * 点击删除按钮的回调方法
     * @param event 
     */
    public deleteClickhandle(value: string, event: React.SyntheticEvent<HTMLAnchorElement>) {
        console.log("deleteClick:", value);
        const deleteid = value;
        if (!deleteid) {
            message.error("无效的对象id");
            return;
        }

        const ix = deleteid.indexOf('_');
        if (ix < 0) {
            message.error('无效的对象id');
            return;
        }

        const id = deleteid.substring(ix + 1);
        const iid = String(id);
        this.props.GlobalControlTypeStore!.Delete(iid);
    }
    /**
     * 获取选中的控制方式ID
     * @param event 
     */
    private getItemId(event:React.SyntheticEvent<HTMLAnchorElement>):(string | undefined){
        try {
            const id= event.currentTarget.getAttribute('id');
            if(!id){
                message.error("无效的对象id");
                return undefined;
            }
            const ix = id.indexOf('_');
            if(ix < 0){
                message.error("无效的对象id");
                return undefined;
            }
            return id.substring(ix +1);
        } catch (error) {
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