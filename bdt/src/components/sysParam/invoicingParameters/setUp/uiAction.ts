import { message } from "antd";
import { action } from "mobx";
import { ISetupProps } from "./interface";

export class SetupViewUiAction {

    private props: ISetupProps;

    constructor(props: ISetupProps) {
        this.props = props;
        this.AddClickhandle = this.AddClickhandle.bind(this);
        this.deleteClickhandle = this.deleteClickhandle.bind(this);
    }

    /**
     * 点击新增按钮
     */
    public AddClickhandle() {

        this.props.InvoicingParametersdoMainStore!.Add();
    }

    @action.bound
    public onTreeSelect(selectedKeys: string[]) {
        if (selectedKeys && selectedKeys.length > 0) {
            this.props.InvoicingParametersdoMainStore!.currentSelectInvoice = selectedKeys[0];
            this.props.InvoicingParametersdoMainStore!.loadData();
        }
    }
    /**
     * 点击删除按钮的回调方法
     * @param e 
     */
    public deleteClickhandle(key: number) {
        console.log('deleteClick:', key)
        const deleteid = key;
        if (!deleteid) {
            message.error("无效的对象id");
            return;
        }

        this.props.InvoicingParametersdoMainStore!.Delete(key);

    }


    // /**
    //  * 获取ID
    //  * @param e 
    //  */
    // private getItemId(e: React.SyntheticEvent<HTMLAnchorElement>):(string | undefined) {
    //     try
    //     {
    //         const id = e.currentTarget.getAttribute('id');

    //         if (!id) {
    //             message.error("无效的对象id");
    //             return undefined;
    //         }

    //         const ix = id.indexOf('_');
    //         if (ix < 0) {
    //             message.error('无效的对象id');
    //             return undefined;
    //         }

    //         return  id.substring(ix + 1);

    //     }catch(error){
    //         message.error(error.message);
    //         return undefined;
    //     }
    // }
}