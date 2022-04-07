import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IBusinessOfficeDialogProps } from "../businessOfficeDialog/interface";
import BusinessOfficeFormView from "../businessOfficeForm/ui";
import { BusinessOfficeDialogUiAction } from "./uiAction";


/**
 * 新增/编辑窗口
 */
@inject("GlobalBusinessOfficeStore")
@observer
export class BusinessOfficeDialogView extends React.Component<IBusinessOfficeDialogProps>{

    private uiAction: BusinessOfficeDialogUiAction;
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IBusinessOfficeDialogProps) {

        super(props);

        this.uiAction = new BusinessOfficeDialogUiAction(props);

        this.state = {
            visiable: false
        }

    }

    public render() {
        return (
            <Modal
                className="bdt-select-tree-overflow"
                title={this.props.title}
                visible={this.props.GlobalBusinessOfficeStore!.isVisibleModal}
                onOk={this.uiAction.HandleOk}
                onCancel={this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <BusinessOfficeFormView
                    GlobalBusinessOfficeStore={this.props.GlobalBusinessOfficeStore!}
                    getUiAction={this.uiAction.GetSonUiAction}
                    getMaxSortNo={this.props.getMaxSortNo}
                />
            </Modal>
        );
    }


}