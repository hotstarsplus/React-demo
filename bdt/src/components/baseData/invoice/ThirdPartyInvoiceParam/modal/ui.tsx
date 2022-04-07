import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ThirdPartyInvoiceParamAddForm from "../form/addForm/ui";
import ThirdPartyInvoiceParamEditForm from "../form/editForm/ui";
import { IThirdPartyInvoiceParamModalProps } from "./interface";
import { ThirdPartyInvoiceParamModalUiAction } from "./uiAction";


@inject("GlobalThirdPartyInvoiceParamDomainStore")
@observer
export class ThirdPartyInvoiceParamModal extends React.Component<IThirdPartyInvoiceParamModalProps>{

    private uiAction:ThirdPartyInvoiceParamModalUiAction;

    constructor(props:IThirdPartyInvoiceParamModalProps){
        super(props);
        this.uiAction = new ThirdPartyInvoiceParamModalUiAction(props);
    }


    public render(){
        return(
            <Modal
                title={this.props.title}
                visible = {this.props.visible}
                onCancel={this.props.onCancel}
                onOk = {this.uiAction.OnOk}
                okText = {"确定"}
                cancelText = {"取消"}
                destroyOnClose = {true}
            >
               {
                   this.props.operationType==="add"?
                   <ThirdPartyInvoiceParamAddForm 
                        GlobalThirdPartyInvoiceParamDomainStore={this.props.GlobalThirdPartyInvoiceParamDomainStore!}
                        getValidate = {this.uiAction.GetValidate} 
                    />:
                    <ThirdPartyInvoiceParamEditForm 
                        GlobalThirdPartyInvoiceParamDomainStore = {this.props.GlobalThirdPartyInvoiceParamDomainStore!}
                        getValidate = {this.uiAction.GetValidate}
                    />
               }
            </Modal>
        )
    }

}