import { message } from 'antd';
import { action } from 'mobx';
// import { ManufacturerDoMainStore } from '../doMainStore';
import { IManufacturerTableProps } from "./interface";


/**
 *  水表厂商的Action
 */
export class ManufacturerTableUiAction{

    private props:IManufacturerTableProps;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props:IManufacturerTableProps){
        
        this.props = props;   

        this.loadData = this.loadData.bind(this);

        this.deleteClickhandle = this.deleteClickhandle.bind(this);

        this.editClickhandle = this.editClickhandle.bind(this);

        this.getItemId = this.getItemId.bind(this);

    }

    /**
     * 默认加载数据
     */
    public loadData(){
        this.props.loadData();
    }

    /**
     * 点击编辑按钮的回调方法
     */
    public editClickhandle(e: React.SyntheticEvent<HTMLAnchorElement>){

        e.preventDefault();

        const id = this.getItemId(e);
        
        if (!id) {return;};
        const iid=String(id);
        if (this.props.GlobalManufacturerStore!.selectedItem(iid)) {
            this.props.onEdit(this.props.GlobalManufacturerStore!.currentEditItem);
        }else{
            message.error('错误的事件参数');
        }

    }

    /**
     * 点击删除按钮的回调方法
     * @param e 
     */
    public deleteClickhandle(value:string,e: React.SyntheticEvent<HTMLAnchorElement>){
        console.log('deleteClick:',value)
        const deleteid = value;
        if (!deleteid) {
            message.error("无效的对象id");
            return ;
        }

        const ix = deleteid.indexOf('_');
        if (ix < 0) {
            message.error('无效的对象id');
            return ;
        }
        const id=deleteid.substring(ix + 1);
        this.Delete(String(id));

    }

    /**
     * 删除
     * @param id 删除数据id
     */
    @action.bound
    public Delete(id:string){
        const store = this.props.GlobalManufacturerStore!
        const index = store.getIndex(id);
        if (index < 0) {
            message.error("删除水表厂商失败");
            return;
        } else {
            if (!store.isLoading) {
                store.isLoading = true;
            }
            this.props.GlobalManufacturerDomainStore!.deleteData(id,store.CompanyName).then((res)=>{
                if (res.rtnCode !== 0) {
                    const str:string = "返回的json中 rtnMsg 字段不是字符串"
                    if(res.rtnMsg === str){
                        message.success("刪除成功");
                        this.props.loadData();
                        return;
                    }
                    message.error(res.rtnMsg);
                    store.isLoading = false;
                }else {
                    message.success("刪除成功");
                    this.props.loadData();
                }
            }) 
        }
    }



    /**
     * 获取选中厂商的ID
     * @param e 
     */
    private getItemId(e: React.SyntheticEvent<HTMLAnchorElement>):(string | undefined) {
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



}
/**
 * 修改提醒信息位置、时间
 */
message.config({
    top: 90,
    duration:3
  });