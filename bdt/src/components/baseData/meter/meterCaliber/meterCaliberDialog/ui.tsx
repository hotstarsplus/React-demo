import { Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import MeterCaliberForm from '../meterCaliberForm/ui'
import { IMeterCaliberDialogProps } from './interface'
import { MeterCaliberDialogUiAction } from './uiAction';

/** 
 * 水费项目类型编辑浏览对话框视图
 */
@inject('GlobalMeterCaliberStore')
@observer
export class MeterCaliberDialog extends React.Component<IMeterCaliberDialogProps> {
    private uiAction: MeterCaliberDialogUiAction;
    constructor(props: IMeterCaliberDialogProps) {
        super(props);
        this.uiAction = new MeterCaliberDialogUiAction(this.props);
        this.state = {
            visiable: false,
        }
    }
    public render() {
        console.log("render MeterCaliberDialog");
        return (
            <Modal
                title ={this.props.title}
                visible={this.props.GlobalMeterCaliberStore!.isVisiableModal}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
                okText={'确定'}
                cancelText={'取消'}
            >
                <MeterCaliberForm
                    store={this.props.GlobalMeterCaliberStore!}
                    getAction={this.uiAction.getSonUiAction}
                />
            </Modal>
        );
    }
}
