import { Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import MeterModelForm from '../meterModelForm/ui'
import { IMeterModelDialogProps } from './interface';
import { MeterModelDialogUiAction } from './uiAction';

/** 
 * 水表型号编辑浏览对话框视图
 */
@inject('GlobalMeterModelStore')
@observer
export class MeterModelDialog extends React.Component<IMeterModelDialogProps> {
    private uiAction: MeterModelDialogUiAction;
    constructor(props: IMeterModelDialogProps) {
        super(props);
        this.uiAction = new MeterModelDialogUiAction(this.props);
        this.state = {
            visiable: false,
        }
    }
    public render() {
        console.log("render GlobalMeterModelStore");
        return (
            <Modal
                title ={this.props.title}
                visible={this.props.GlobalMeterModelStore!.isVisibleModal}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <MeterModelForm
                    store={this.props.GlobalMeterModelStore!}
                    getAction={this.uiAction.getSonUiAction}
                />
            </Modal>
        );
    }
}
