import { Button,Card } from 'antd';
import { inject,observer } from 'mobx-react';
import * as React from 'react';
import { CustomerTypeDialog } from '../customerTypeDialog/ui';
import { CustomerTypeTableView } from '../customerTypeTable/ui';
import {ICustomerTypeViewProps} from './interface';
import { CustomerTypeViewAction } from './uiAction';


@inject('GlobalCustomerTypeStore')
@observer
export class CustomerTypeView extends React.Component<ICustomerTypeViewProps>{
    private uiAction:CustomerTypeViewAction;

    constructor(props:any){
        super(props);
        this.uiAction=new CustomerTypeViewAction(this.props.GlobalCustomerTypeStore!);
    }

    public render(){
        console.log('render CustomerTypeView');
        return(
            <Card bordered={false} className='card'>
                <div className='tableList'>
                    <div className={'tableListOperator'}>
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                            新建
                        </Button>
                    </div>
                    <CustomerTypeTableView
                    onEdit={this.uiAction.onEditClick}/>
                </div>
                <CustomerTypeDialog
                    handCancel={this.uiAction.cancelAddorEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                />
            </Card>
        );
    }
}