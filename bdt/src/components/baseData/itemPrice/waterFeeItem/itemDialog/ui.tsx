import { Modal } from 'antd';
import { inject,observer} from 'mobx-react';
import * as React from 'react';
import WaterFeeItemForm from '../itemForm/ui'
import { IWaterFeeItemDialogProps } from './interface'
import { WaterFeeItemDialogUiAction } from './uiAction';

/** 
 * 水费项目类型编辑浏览对话框视图
 */
@inject('GlobalWaterFeeItemStore')
@observer
export class WaterFeeItemDialog extends React.Component<IWaterFeeItemDialogProps> {

    private uiAction: WaterFeeItemDialogUiAction;

    constructor(props: IWaterFeeItemDialogProps) {
        super(props);
        this.uiAction = new WaterFeeItemDialogUiAction(this.props);
        this.state={
            visiable:false,
        }
    }

    public render() {
        console.log("render WaterRateItemItemDialog");

        return (
            <Modal
                title ={this.props.title}
                visible={this.props.visible}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
                <WaterFeeItemForm
                    store={this.props.GlobalWaterFeeItemStore!}
                    getAction={this.uiAction.getSonUiAction}
                />

            </Modal>
        );
    }
}
