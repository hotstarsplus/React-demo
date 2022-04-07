import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ProductKindForm from "../form/ui";
import { IProductKindModalProps } from "./interface";
import { ProductKindModalUiAction } from "./uiAction";






@inject("ProductKindUiStore")
@observer
export class ProductKindModal extends React.Component<IProductKindModalProps>{

    private uiAction:ProductKindModalUiAction;

    constructor(props:IProductKindModalProps){
        super(props);
        this.uiAction = new ProductKindModalUiAction(props);
    }


    public render(){
        return(
            <Modal
                visible = {this.props.visible}
                onCancel = {this.props.onCancel}
                onOk = {this.uiAction.OnOk}
                okText={"确定"}
                cancelText={"取消"}
                title={this.props.isEditModalShow?'编辑产品性质':'新建产品性质'}
                width='600px'
                style={{minWidth:'600px'}}
            >
                <ProductKindForm
                    ProductKindUiStore = {this.props.ProductKindUiStore!}
                    getValidate = {this.uiAction.getValidate}
                    fatherIdIsCanEdit={this.props.fatherIdIsCanEdit}
                />
            </Modal>
        )
    }





}