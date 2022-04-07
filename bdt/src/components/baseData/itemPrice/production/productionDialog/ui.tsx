import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import WaterProductionFormView from "../productionForm/ui";
import { IWaterProductionDialogProps } from "./interface";
import { ProductionDialogUiAction } from "./uiAction";


@inject("GlobalWaterProductionStore")
@observer
export class WaterProductionDialogView extends React.Component<IWaterProductionDialogProps>{


    private uiAction:ProductionDialogUiAction;


    constructor(props:IWaterProductionDialogProps){

        super(props);

        this.uiAction = new ProductionDialogUiAction(props);

    }

    public render(){
        console.log("ProductionDialogView  render()");
            return(
                <Modal
                    title ={this.props.title}
                    visible = {this.props.visiable}
                    onCancel = {this.props.handleCancel}
                    onOk = {this.uiAction.handleOk}
                    width= {520}
                    okText = "确定"
                    cancelText="取消"
                    destroyOnClose={true}
                 >
                 <div style={{height: "400px", overflow: "auto", overflowX: "hidden"}}>
                     <WaterProductionFormView
                        GlobalProductionStore = {this.props.GlobalWaterProductionStore!} 
                        getUiAction={this.uiAction.GetSonUiAction}
                      />
                 </div>
                </Modal>
            );
    }


}