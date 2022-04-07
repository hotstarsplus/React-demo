import { Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import BusinessTypeFrom from '../businessTypeForm/ui';
import { IBusinessTypeDialogProps } from './interface';
import { BusinessTypeDialogUiAction } from './uiAction';

/**
 * 业务类别的对话框
 */
@inject('GlobalBusinesstypeStore')
@observer
export class BusinessTypeDialog extends React.Component<IBusinessTypeDialogProps> {

    private uiAction: BusinessTypeDialogUiAction;

    constructor(props: IBusinessTypeDialogProps) {
        super(props);
        this.uiAction = new BusinessTypeDialogUiAction(this.props);
        this.state = {
            visiable: false,
        }
    }

    public render() {
        return (
            <Modal
                title='编辑业务类别'
                visible={this.props.visible}
                onOk={this.uiAction.HandleOk}
                onCancel={this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
                <BusinessTypeFrom
                    store={this.props.GlobalBusinesstypeStore!}
                    getAction={this.uiAction.getSonUiAction}
                />

            </Modal>
        );
    }
}
