import { Button,Card } from 'antd';
import { inject,observer } from 'mobx-react';
import * as React from 'react';
import { CardTypeCopyDateDialog } from '../cardTypeCopyDateDialog/ui';
import {CardTypeCopyDateTableView} from '../cardTypeCopyDateTable/ui';
import {ICardTypeCopyDateViewProps} from './interface';
import {CardTypeCopyDateViewAction} from './uiAction';


@inject ('GlobalCardTypeCopyDateStore')
@observer

export class CardTypeCopyDateView extends React.Component<ICardTypeCopyDateViewProps>{
    private uiAction:CardTypeCopyDateViewAction;

    constructor(props:any){
        super(props);
        this.uiAction=new CardTypeCopyDateViewAction(this.props.GlobalCardTypeCopyDateStore!);
    }
    public render(){
        console.log('render CardTypeCopyDateView')
        return(
            <Card bordered={false} className='card'>
                <div className='tableList'>
                    <div className={'tableListOperator'}>
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                        新建
                        </Button>
                    </div>
                    <CardTypeCopyDateTableView onEdit={this.uiAction.onEditClick}/>
                </div>

                <CardTypeCopyDateDialog
                    handCancel={this.uiAction.cancelAddorEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                    title= {this.uiAction.modaltitle}
                />
            </Card>
        )
    }
}