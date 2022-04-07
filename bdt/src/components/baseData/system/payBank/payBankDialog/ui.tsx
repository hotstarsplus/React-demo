import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import  PayBankFormView  from "../payBankForm/ui";
import { IPayBankDialogProps } from "./interface";
import { PayBankDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalPayBankStore")
@observer
export class PayBankDialogView extends React.Component<IPayBankDialogProps>{

    private uiAction:PayBankDialogUiAction;

    constructor(props:IPayBankDialogProps){

        super(props);

        this.uiAction = new PayBankDialogUiAction(props); 

        this.state={
            visiable:false 
        }

    }

    public render(){
        return(
            <Modal 
                className="bdt-select-tree-overflow"
                title ={this.props.title} 
                visible = {this.props.GlobalPayBankStore!.isVisibleModal}
                onOk = {this.uiAction.HandleOk}
                onCancel = {this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <PayBankFormView 
                 GlobalPayBankStore={this.props.GlobalPayBankStore!}
                 getUiAction = {this.uiAction.GetSonUiAction}
                 getMaxSortNo = {this.props.getMaxSortNo}
                 />
            </Modal>
        );
    }


}