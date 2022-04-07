import {Icon,Table} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import {action} from 'mobx';
import { inject,observer } from 'mobx-react';
import * as React from 'react';
import {CardTypeCopyDateModel} from '../entity';
import {ICardTypeCopyDateTableViewProps} from './interface';
import {CardTypeCopyDateTableAction} from './uiAction';


class CardTypeCopyDateTable extends Table<CardTypeCopyDateModel>{}

@inject('GlobalCardTypeCopyDateStore')
@observer
export class CardTypeCopyDateTableView extends React.Component<ICardTypeCopyDateTableViewProps>{
    private columns:Array<ColumnProps<CardTypeCopyDateModel>>=Array<ColumnProps<CardTypeCopyDateModel>>(
        {
        key:"action",
        render:(text:any,record:CardTypeCopyDateModel,index:number)=>{
            return(
                <div className="div-hide">
                    <a
                        href={'javascript:;'}
                        id={`edit_${record.AutoId}`}
                        onClick={this.uiAction.editClick}
                        title={"编辑"}
                    >
                        <Icon type='edit'/>
                    </a>
                    <a
                        href={'javascript:;'}
                        id={`edit_${record.AutoId}`}
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
            dataIndex:"CardTypeId",
            key:"CardTypeId",
            title:"水卡类型编码"
        },
        {
            dataIndex:"CopyDayBegin",
            key:"CopyDayBegin",
            title:"抄表开始日期"
        },
        {
            dataIndex:"CopyDayEnd",
            key:"CopyDayEnd",
            title:"抄表结束日期"
        },
    
    );
    private uiAction:CardTypeCopyDateTableAction;
    constructor(props:ICardTypeCopyDateTableViewProps){
        super(props);
        this.uiAction=new CardTypeCopyDateTableAction(this.props);
        this.setRowClassName=this.setRowClassName.bind(this);
        this.getRowIndex=this.getRowIndex.bind(this);
    }
    public componentDidMount(){
        this.uiAction.loadData();
    }

    public render(){
        console.log("render CardTypeCopyDateTableView");
        const {GlobalCardTypeCopyDateStore}=this.props;
        return(
            <CardTypeCopyDateTable
                columns={this.columns}
                dataSource={GlobalCardTypeCopyDateStore!.list.slice()}
                loading={GlobalCardTypeCopyDateStore!.isLoading}
                locale = {{
                    emptyText:GlobalCardTypeCopyDateStore!.isLoading?[]:undefined
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
    private getRowIndex(record:CardTypeCopyDateModel,index:number):string{
        return index.toString();
    }
}