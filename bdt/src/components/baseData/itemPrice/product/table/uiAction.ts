import { message } from "antd";
import { action } from "mobx";
import { IWaterProductTableProps } from "./interface";




export class WaterProductTableUiAction{


    private props:IWaterProductTableProps;


    constructor(props:IWaterProductTableProps){

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

        if (this.props.GlobalWaterProductStore!.SelectedRow(id!)) {
            this.props.onEdit(this.props.GlobalWaterProductStore!.CurrentEditItem);
        }else{
            message.error("未找到需要编辑的项目");
        }


      

    }



}