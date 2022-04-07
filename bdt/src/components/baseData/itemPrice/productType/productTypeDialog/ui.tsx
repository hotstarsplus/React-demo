import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ProductTypeForm from "../productTypeForm/ui";
import { IProductTypeDialogProps } from "./interface";
import { ProductTypeDialogUiAction } from "./uiAction";




/**
 * 产品类型新增编辑弹出框
 */
@inject("GlobalProductTypeStore")
@observer
export class ProductTypeDialog extends React.Component<IProductTypeDialogProps>{

    private uiAction:ProductTypeDialogUiAction;

    constructor(props:IProductTypeDialogProps){
        super(props)
        this.uiAction = new ProductTypeDialogUiAction(props);
    }

    public render(){
        return(
           <Modal
           title ={this.props.title}
           visible = {this.props.visible}
           onOk = {this.uiAction.handleOk}
           onCancel = {this.props.handleCancel}
           okText = "确定"
           cancelText = "取消"
           >
                <ProductTypeForm 
                store={this.props.GlobalProductTypeStore!} 
                getUiAction = {this.uiAction.getSonFormUiAction} 
                />
           </Modal>

        );
    }


}