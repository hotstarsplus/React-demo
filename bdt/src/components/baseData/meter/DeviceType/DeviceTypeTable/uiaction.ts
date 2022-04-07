import { message } from "antd";
import { action } from "mobx";
import { IDeviceTypeTableViewProps } from "./interface";


export class DeviceTypeUiAction{
    private props:IDeviceTypeTableViewProps;
    
    constructor(props:IDeviceTypeTableViewProps){
        this.props=props;
        this.loadData = this.loadData.bind(this);
        this.addClick = this.addClick.bind(this);

        this.editClick = this.editClick.bind(this);

        this.deleteClick = this.deleteClick.bind(this);

        this.getDeviceTypeId = this.getDeviceTypeId.bind(this);
    }

    @action
    public loadData(){
        this.props.GlobalDeviceTypeStore!.loadData();
        this.props.GlobalDeviceTypeStore!.loadCategoryData();
    }


    /**
     * 新增事件
     * @param e 
     */
    @action
    public addClick(e:React.SyntheticEvent<HTMLAnchorElement>){

        e.preventDefault();

        const id = this.getDeviceTypeId(e);

        if(!id){return ;} ;

        if (this.props.GlobalDeviceTypeStore!.SelectedDeviceType(id)) {

            this.props.onAdd(this.props.GlobalDeviceTypeStore!.currentEditItem);
        } else {
            message.error("错误的事件参数");
        }

    }


    /**
     * 编辑事件
     * @param e 
     */
    @action
    public async editClick(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const id = this.getDeviceTypeId(e);
        console.log(id);
        if(!id){return;};

        if (this.props.GlobalDeviceTypeStore!.SelectedDeviceType(id)) {
          
            this.props.onEdit(this.props.GlobalDeviceTypeStore!.currentEditItem);
        } else {
            message.error('错误的事件参数');
        }
    }

    /**
     * 删除事件
     * @param e 
     */
    @action
    public async deleteClick(value:string,e:React.SyntheticEvent<HTMLAnchorElement>){
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
        if (!id) { return; }
        if (this.props.GlobalDeviceTypeStore!.SelectedDeviceType(id)) {
            this.props.GlobalDeviceTypeStore!.DeleteDeviceType(this.props.GlobalDeviceTypeStore!.currentEditItem);
        }else{
            message.error('错误的事件参数');
        }
    }

    /**
     * 获取银行ID
     * @param e 
     */
    private getDeviceTypeId(e:React.SyntheticEvent<HTMLAnchorElement>):(string|undefined){

        const id = e.currentTarget.getAttribute("id");
        console.log(id);
        if(!id){
            message.error("无效的对象id")
            return undefined;
        }
        const index = id.indexOf("_");
        if (index<0) {
            message.error("无效的对象id")
            return undefined;
        }
        try {
            return id.substring(index+1);
        } catch (error) {
            console.log(error.message);
            return undefined;
        }

    }

}