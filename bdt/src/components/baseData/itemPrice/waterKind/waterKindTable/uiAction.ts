import { message } from "antd";
import { action } from "mobx";
import { IWaterKindTableProps } from "./interface";



export class WaterKindTableUiAction{

    private props:IWaterKindTableProps;

    constructor(props:IWaterKindTableProps){

        this.props = props;

        this.loadData = this.loadData.bind(this);

        this.editClick = this.editClick.bind(this);

        this.deleteClick = this.deleteClick.bind(this);


    }

    /**
     * 加载数据
     */
    @action
    public loadData(){
        this.props.GlobalWaterKindStore!.LoadingData();
        
    }

    /**
     * 编辑事件
     * @param e 
     */
    public async editClick(e:React.SyntheticEvent<HTMLAnchorElement>){

        e.preventDefault();

        const id = e.currentTarget.getAttribute("id");

        if(!id){return;};

        if (this.props.GlobalWaterKindStore!.SelectedWaterKind(id)) {

            this.props.onEdit(this.props.GlobalWaterKindStore!.CurrentEditWaterKind);
        } else {
            message.error('错误的事件参数');
        }

    }

    /**
     * 删除事件
     * @param e 
     */
    public async deleteClick(waterKindId:string){

        if (this.props.GlobalWaterKindStore!.SelectedWaterKind(waterKindId)) {

            const res = await this.props.GlobalWaterKindStore!.DeleteWaterKind(this.props.GlobalWaterKindStore!.CurrentEditWaterKind)
            
            res.rtnCode===0?message.success("删除成功"):message.error(res.rtnMsg);

        } else {
            message.error('错误的事件参数');
        }

       

     

    }


}