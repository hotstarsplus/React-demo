import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import WaterProductFormView from "../form/ui";
import { IWaterProductDialogProps } from "./interface";
import "./ui.scss"
import { ProductDialogUiAction } from "./uiAction";


@inject("GlobalWaterProductStore")
@observer
export class WaterProductDialogView extends React.Component<IWaterProductDialogProps>{


    private uiAction:ProductDialogUiAction;


    constructor(props:IWaterProductDialogProps){

        super(props);

        this.uiAction = new ProductDialogUiAction(props);

    }
    // public componentDidMount(){
    //     this.props.GlobalWaterProductStore!.loadBillTypeMenu();
    // }

    public render(){
        console.log("ProductDialogView  render()");
            return(
                <Modal
                    className={'bdt-product-model'}
                    title ={this.props.title}
                    visible = {this.props.visiable}
                    onCancel = {this.props.handleCancel}
                    onOk = {this.uiAction.handleOk}
                    width= {520}
                    okText = "确定"
                    cancelText="取消"
                    destroyOnClose={true}
                 >
                 <div>
                     <WaterProductFormView
                        GlobalWaterProductStore = {this.props.GlobalWaterProductStore!} 
                        getUiAction={this.uiAction.GetSonUiAction}
                        businessTypeId={this.props.businessTypeId}
                      />
                 </div>
                </Modal>
            );
    }


}