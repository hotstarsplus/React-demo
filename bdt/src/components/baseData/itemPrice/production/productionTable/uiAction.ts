import { message } from "antd";
import { action } from "mobx";
import { IWaterProductionTableProps } from "./inerface";




export class WaterProductionTableUiAction{


    private props:IWaterProductionTableProps;


    constructor(props:IWaterProductionTableProps){

        this.props = props;
        this.Edit = this.Edit.bind(this);
    }

    /**
     * 编辑
     * @param e 
     */
    @action
    public Edit(e: React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();

        const id = e.currentTarget.getAttribute("id");

        if (this.props.GlobalWaterProductionStore!.SelectedRow(id!)) {
            this.props.onEdit(this.props.GlobalWaterProductionStore!.CurrentEditItem);
        }else{
            message.error("未找到需要编辑的项目");
        }


      

    }



}