import { Icon,Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import {action} from 'mobx';
import  { inject,observer} from 'mobx-react';
import * as React from 'react';
import {CustomerTypeModel} from '../entity';
import { ICustomerTypeTableViewProps } from './interface';
import {CustomerTypeTableAction} from './uiAction';

class CustomerTypeTable extends Table<CustomerTypeModel>{}

@inject('GlobalCustomerTypeStore')
@observer
export class CustomerTypeTableView extends React.Component<ICustomerTypeTableViewProps>{

    private columns:Array<ColumnProps<CustomerTypeModel>>=Array<ColumnProps<CustomerTypeModel>>(
        {
        key:"action",
        render:(text:any,record:CustomerTypeModel,index:number)=>{
            return(
                <div className="div-hide">
                    <a 
                        href={'javascript:;'}
                        id={`edit_${record.CustomerTypeId}`}
                        onClick={this.uiAction.editClick}
                        title={"编辑"}
                    >
                        <Icon type='edit' />
                    </a>
                    <a
                        href={'javascript:;'}
                        id={`edit_${record.CustomerTypeId}`}
                        onClick={this.uiAction.deleteClick}
                        title={"删除"}
                    >
                        <Icon type='delete' />
                    </a>
                </div>
            );
        },
        width:"80px",
    },
    {
        dataIndex:"CustomerTypeName",
        key:"CustomerTypeName",
        title:"用户类型名称"
    },
    {
        dataIndex:"Description",
        key:"Description",
        title:"备注说明"
    },
    );
    private uiAction:CustomerTypeTableAction;
    constructor(props:ICustomerTypeTableViewProps){
        super(props);
        this.uiAction=new CustomerTypeTableAction(this.props);

        this.setRowClassName = this.setRowClassName.bind(this);
        this.getRowIndex = this.getRowIndex.bind(this);
    }

    public componentDidMount(){
        this.uiAction.loadData();
    }

    public render(){
        console.log("render CustomerTypeTableView");
        const{GlobalCustomerTypeStore}=this.props;
        return(
            <CustomerTypeTable
                columns={this.columns}
                dataSource={GlobalCustomerTypeStore!.list.slice()}
                loading={GlobalCustomerTypeStore!.isLoading}
                locale = {{
                    emptyText:GlobalCustomerTypeStore!.isLoading?[]:undefined
                }}
                rowKey={this.getRowIndex}
                rowClassName={this.setRowClassName}
                size="middle"
            />
        );
    }

    @action
    private setRowClassName(record:any,index:number):string{
        return "tr-class";
    }

    private getRowIndex(record:CustomerTypeModel,index:number):string{
        return index.toString();
    }
}