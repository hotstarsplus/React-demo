import { Modal } from 'antd';
import { inject,observer} from 'mobx-react';
import * as React from 'react';
import WaterRateItemTypeItemForm from '../itemForm/ui'
import { IWaterRateItemTypeItemDialogProps } from './interface'
import { WaterRateItemTypeItemDialogUiAction } from './uiAction';

/** 
 * 水费项目类型编辑浏览对话框视图
 */
@inject('GlobalWaterRateItemTypeStore')
@observer
export class WaterRateItemTypeItemDialog extends React.Component<IWaterRateItemTypeItemDialogProps> {

    private uiAction: WaterRateItemTypeItemDialogUiAction;

    constructor(props: IWaterRateItemTypeItemDialogProps) {
        super(props);
        this.uiAction = new WaterRateItemTypeItemDialogUiAction(this.props);
        this.state={
            visiable:false,
        }
    }

    public render() {
        console.log("render WaterRateItemTypeItemDialog");

        return (
            <Modal
                title ={this.props.title}
                visible={this.props.visible}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
            >
                <WaterRateItemTypeItemForm
                    store={this.props.GlobalWaterRateItemTypeStore!}
                    getAction={this.uiAction.getSonUiAction}
                />

            </Modal>
        );
    }
}
