import { Modal } from 'antd';
import { inject,observer } from 'mobx-react';
import * as React from 'react';
import CustomerTypeForm from '../customerTypeForm/ui';
import { ICustomerTypeDiaLogProps } from './interface';
import { CustomerTypeDialogUiAction } from './uiAction';


@inject('GlobalCustomerTypeStore')
@observer
export class CustomerTypeDialog extends React.Component<ICustomerTypeDiaLogProps>{
    private uiAction:CustomerTypeDialogUiAction;

    constructor(props : ICustomerTypeDiaLogProps){
        super(props);
        this.uiAction=new CustomerTypeDialogUiAction(this.props);
        this.state={
            visiable:false,
        }
    }
    public render(){
        console.log("render GlobalCustomerTypeStore");

        return(
            <Modal
                title ={this.props.title}
                visible={this.props.visible}
                onOk={this.uiAction.handleOk}
                onCancel={this.props.handCancel}
            >
                <CustomerTypeForm
                    store={this.props.GlobalCustomerTypeStore!}
                    getAction={this.uiAction.getSonUiAction}
                />
            </Modal>
        );
    }


}