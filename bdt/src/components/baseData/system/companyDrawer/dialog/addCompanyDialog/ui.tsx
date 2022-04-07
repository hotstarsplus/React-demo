import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import CompanyForm from "../../form/companyForm/ui";
import { ICompanyDialogProps } from "./interface";
import { CompanyDialogUiAction } from "./uiAction";



@inject("GlobalCompanyDrawerDomainStore")
@observer
export class CompanyDialog extends React.Component<ICompanyDialogProps>{


    private uiAction:CompanyDialogUiAction;

    constructor(props:ICompanyDialogProps){
        super(props);
        this.uiAction = new CompanyDialogUiAction(props);
    }


    public render(){
        return(
            <Modal
                title ={this.props.title}
                visible = {this.props.visible}
                okText = {"确定"}
                cancelText={"取消"}
                onCancel = {this.props.onCancel}
                onOk = {this.uiAction.OnOk}
                destroyOnClose = {true}
            >
                <CompanyForm 
                    GlobalCompanyDrawerDomainStore = {this.props.GlobalCompanyDrawerDomainStore!}
                    validate = {this.uiAction.GetFormValidate}
                />
            </Modal>
        )
    }


}