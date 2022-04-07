import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import  CalcFeeTypeForm  from "../calcFeeTypeForm/ui";
import { ICalcFeeTypeDialogProps } from "./interface";
import { CalcFeeTypeDialogUiAction } from "./uiAction";

/**
 * 计费方式编辑浏览对话框视图
 */
@inject('GlobalCalcFeeTypeStore')
@observer
export class CalcFeeTypeDialog extends React.Component<ICalcFeeTypeDialogProps>{
    private uiAction:CalcFeeTypeDialogUiAction;

    constructor(props:ICalcFeeTypeDialogProps){
        super(props);
        this.uiAction=new CalcFeeTypeDialogUiAction(this.props);
        this.state={
            visiable:false,
        }
    }
    public render(){
        return(
            <Modal
                title ={this.props.title}
                visible={this.props.visible}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
                okText={"确定"}
                cancelText={"返回"}
            >
                <CalcFeeTypeForm 
                    store={this.props.GlobalCalcFeeTypeStore!}
                    getAction={this.uiAction.getSonUiAction}
                />
            </Modal>
        )
    }
}