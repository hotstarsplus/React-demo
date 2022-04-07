import { Modal } from 'antd';
import { inject , observer} from 'mobx-react';
import * as React from 'react';
import  ControlTypeFormView from '../controlTypeForm/ui'
import {IControlTypeDialogProps} from './interface'
import { ControlTypeDialogUiAction } from './uiAction';
/**
 * 新增/编辑窗口弹出层
 */
@inject("GlobalControlTypeStore")
@observer
export class ControlTypeDiglogView extends React.Component<IControlTypeDialogProps>{
    private uiAction:ControlTypeDialogUiAction;
    /**
     * 构造方法
     */
    constructor(props:IControlTypeDialogProps){
        super(props);
        this.uiAction=new ControlTypeDialogUiAction(props);
        this.state={
            visiable:false
        };
    }
    public render(){
        return(
                <Modal
                    title ={this.props.title}
                    visible = {this.props.GlobalControlTypeStore!.isVisibleModal}
                    onOk={this.uiAction.handleOk}
                    onCancel = {this.props.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                <ControlTypeFormView
                    store={this.props.GlobalControlTypeStore!}
                    getAction={this.uiAction.getSonUiAction}
                />

                </Modal>
        );
    }
}