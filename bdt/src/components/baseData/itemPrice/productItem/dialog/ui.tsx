import { Modal } from 'antd';
import { inject,observer} from 'mobx-react';
import * as React from 'react';
import ProductItemForm from '../form/ui'
import { IProductItemDialogProps } from './interface'
import { ProductItemDialogUiAction } from './uiAction';

/** 
 * 水费项目类型编辑浏览对话框视图
 */
@inject('GlobalProductItemStore')
@observer
export class ProductItemDialog extends React.Component<IProductItemDialogProps> {

    private uiAction: ProductItemDialogUiAction;

    constructor(props: IProductItemDialogProps) {
        super(props);
        this.uiAction = new ProductItemDialogUiAction(this.props);
        this.state={
            visiable:false,
        }
    }

    public render() {
        console.log("render WaterRateItemItemDialog");

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handleCancel}
                okText={"确定"}
                cancelText={"取消"}
            >
                <ProductItemForm
                    store={this.props.GlobalProductItemStore!}
                    getAction={this.uiAction.getSonUiAction}
                />

            </Modal>
        );
    }
}
