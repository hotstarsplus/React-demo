import { Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import QuantityTapyForm from '../tapyForm/ui'
import { IQuantityTapyDialogProps } from './interface'
import { QuantityTapyDialogUiAction } from './uiAction';

/** 
 * 水量类型编辑浏览对话框视图
 */
@inject('GlobalQuantityTapyStore')
@observer
export class QuantityTapyDialog extends React.Component<IQuantityTapyDialogProps> {
    private uiAction: QuantityTapyDialogUiAction;
    constructor(props: IQuantityTapyDialogProps) {
        super(props);
        this.uiAction = new QuantityTapyDialogUiAction(this.props);
        this.state = {
            visiable: false,
        }
    }
    public render() {
        console.log("render QuantityTapyDialog");
        return (
            <Modal
                title="编辑水量类型"
                visible={this.props.visible}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
                okText={'确定'}
                cancelText={'取消'}
            >
                <QuantityTapyForm
                    store={this.props.GlobalQuantityTapyStore!}
                    getAction={this.uiAction.getSonUiAction}
                />
            </Modal>
        );
    }
}
