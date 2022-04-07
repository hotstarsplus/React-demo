import {Modal} from 'antd';
import {inject,observer} from 'mobx-react';
import * as React from 'react';
import CardTypeCopyDateForm from '../cardTypeCopyDateForm/ui';
import {ICardTypeCopyDateDiaLogProps} from './interface';
import {CardTypeCopyDateDialogUiAction} from './uiAction';


@inject('GlobalCardTypeCopyDateStore')
@observer
export class CardTypeCopyDateDialog extends React.Component<ICardTypeCopyDateDiaLogProps>{
        private uiAction:CardTypeCopyDateDialogUiAction;

        constructor(props:ICardTypeCopyDateDiaLogProps){
            super(props);
            this.uiAction=new CardTypeCopyDateDialogUiAction(this.props);
            this.state={
                visiable:false,
            }
        }
        public render(){
            console.log("render GolbalCardTypeCopyDateStore");
            return(
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.uiAction.handleOk}
                    onCancel={this.props.handCancel}
                >
                    <CardTypeCopyDateForm
                        store={this.props.GlobalCardTypeCopyDateStore!}
                        getAction={this.uiAction.getSonUiAction}
                    />
                </Modal>
            )

        }


}