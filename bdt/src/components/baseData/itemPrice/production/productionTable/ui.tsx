import { Checkbox, Icon, Popconfirm, Table } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { WaterProduction } from "../entity";
import { IWaterProductionTableProps } from "./inerface";
import { WaterProductionTableUiAction } from "./uiAction";

interface IWaterProductionTableState{
    waterFeeItemId:string;
}


@inject("GlobalWaterProductionStore")
@observer
export class WaterProductionTable extends React.Component<IWaterProductionTableProps,IWaterProductionTableState>{

    private uiAction:WaterProductionTableUiAction;


    private columns:Array<ColumnProps<WaterProduction>>=Array<ColumnProps<WaterProduction>>(
        {
            key: 'Check',
            render: (text: any, record: WaterProduction, index: number) => {
                return (
                    <div>
                        <Popconfirm
                            title = {"确定取消关联?"}
                            visible = {record.WaterFeeItemId===this.state.waterFeeItemId}
                            onCancel = {this.onCheckboxCancel}
                            onConfirm = {this.onCheckboxOk.bind(undefined,record)}
                            okText={"确定"}
                            cancelText = {"取消"}
                        >
                            <Checkbox 
                            checked = {record.IsDelete.trim()==='0'?true:false} 
                            value={record} 
                            onChange = {this.onCheckboxChange}
                            />
                         </Popconfirm>
                    </div>
                );
            },
            title: '操作',
            width:"5%"
           },

       {
        dataIndex: 'WaterFeeItemName',
        key: 'WaterFeeItemName',
        title: '水费项目',
        width:"10%"
       },
       {
        dataIndex: 'CalcFeeTypeName',
        key: 'CalcFeeTypeName',
        title: '计费方式',
        width:"10%"
       },
       {
        key: 'IsSystemClacFee',
        render:(record:WaterProduction)=>{
            return (
                record.IsSystemClacFee.trim()===''?'':record.IsSystemClacFee==='0'?"否":"是"
            );
        },
        title: '是否由系统计费',
        width:"10%"
       },
       {
        key: 'IsRandClacFee',
        render:(record:WaterProduction)=>{
            return (
                record.IsRandClacFee.trim()===''?'':record.IsRandClacFee==='0'?"否":"是"
            );
        },
        title: '是否随机收费项目',
        width:"12%"
       },
       {
        key: 'IsAddedTax',
        render:(record:WaterProduction)=>{
            return (
                record.IsAddedTax.trim()===''?'':record.IsAddedTax.trim()==='0'?"否":"是"
            );
        },
        title: '是否增值税项目',
        width:"10%"
        },
       {
        dataIndex: 'AccountCode',
        key: 'AccountCode',
        title: '会计科目',
        width:"10%"
       },
       {
        dataIndex: 'ProductTypeName',
        key: 'ProductTypeName   ',
        title: '产品类型',
        width:"10%"
       },
       {
        dataIndex: 'ActualPrice',
        key: 'ActualPrice   ',
        title: '价格',
        width:"8%"
       },
       {
        key: 'action',
        render: (text: any, record: WaterProduction, index: number) => {
            return (
                <div style={{display: record.IsDelete.trim()==='0'?"inline-block":"none"}}>
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.Edit}
                         id = {record.WaterFeeItemId}
                         title = "编辑"
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                </div>
            );
        },
        title: '操作',
        width:"7%"
       },
       {
        key: 'State',
        render:(record:WaterProduction)=>{
            return (
                record.IsDelete.trim()==='0'?"已关联":"未关联"
            );
        },
        title: '状态',
        width:"8%"
        }
    );
 
    constructor(props:IWaterProductionTableProps){

        super(props)

        this.uiAction = new WaterProductionTableUiAction(props);

        this.getRowKey =this.getRowKey.bind(this);

        this.onCheckboxChange = this.onCheckboxChange.bind(this);

        this.onCheckboxCancel = this.onCheckboxCancel.bind(this);

        this.onCheckboxOk = this.onCheckboxOk.bind(this);

        this.state={
            waterFeeItemId:""
        }


    }
   

    public render(){
        console.log("ProductionTbaleView render()");
        return(
            <Table<WaterProduction>
                bordered={true}
                columns={this.columns}
                dataSource = {this.props.GlobalWaterProductionStore!.WaterProductionList.slice()}
                loading = {this.props.GlobalWaterProductionStore!.Loading}
                locale = {{
                    emptyText:this.props.GlobalWaterProductionStore!.Loading?[]:undefined
                }}
                rowKey = {this.getRowKey} 
                className = {"ori-table ori-table-scroll"}
                style={{whiteSpace:"nowrap"}}
                pagination = {false}
                scroll={{y:100}}
            />
        );
    }

    @action
    private onCheckboxChange(e:CheckboxChangeEvent){

        if (e.target.checked) {
            this.props.onChecked(e.target.value);
        }else{
            this.setState({
                waterFeeItemId:e.target.value!.WaterFeeItemId
            })
        }

        
    }

    @action
    private onCheckboxCancel(e: React.MouseEvent<any>){
        this.setState({
            waterFeeItemId:""
        })
    }

    @action
    private onCheckboxOk(model:WaterProduction){

        this.props.onCancelChecked(model);

        this.setState({
            waterFeeItemId:""
        })
    }


    @action
    private getRowKey(record: WaterProduction, index: number):string{

        return record.WaterFeeItemId
    }



}