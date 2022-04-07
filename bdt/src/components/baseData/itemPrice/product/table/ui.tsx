import { Checkbox, Icon, Popconfirm, Table } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ColumnProps } from "antd/lib/table";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { WaterProduct } from "../entity";
import { IWaterProductTableProps } from "./interface";
import { WaterProductTableUiAction } from "./uiAction";

interface IWaterProductTableState{
    productItemId:string;
}


@inject("GlobalWaterProductStore")
@observer
export class WaterProductTable extends React.Component<IWaterProductTableProps,IWaterProductTableState>{

    private uiAction:WaterProductTableUiAction;


    private columns:Array<ColumnProps<WaterProduct>>=Array<ColumnProps<WaterProduct>>(
        {
            key: 'Check', 
            render: (text: any, record: WaterProduct, index: number) => {
                return (
                    <div>
                    {
                        record.IsDelete.trim()==='0'?
                        <Popconfirm
                            title = {"确定取消关联?"}
                            onCancel = {this.onCheckboxCancel}
                            onConfirm = {this.onCheckboxOk.bind(undefined,record)}
                            okText={"确定"}
                            cancelText = {"取消"}
                        >
                            <Checkbox 
                            checked = {record.IsDelete.trim()==='0'?true:false} 
                            value={record} 
                            onChange = {this.onCheckboxChange.bind(undefined,record.ProductItemId)}
                            />
                         </Popconfirm>
                        :
                            <Checkbox 
                            checked = {record.IsDelete.trim()==='0'?true:false} 
                            value={record} 
                            onChange = {this.onCheckboxChange.bind(undefined,record.ProductItemId)}
                            />
                    }
                        
                    </div>
                );
            },
            title: '操作',
            width:50
           },

       {
        dataIndex: 'ProductItemName',
        key: 'ProductItemName',
        title: '产品项目',
        width:150
       },
       {
        dataIndex: 'CalcFeeTypeName',
        key: 'CalcFeeTypeName',
        title: '计费方式',
        width:100
       },
       {
        key: 'IsSystemClacFee',
        render:(record:WaterProduct)=>{
            return (
                record.IsSystemClacFee.trim()===''?'':record.IsSystemClacFee==='0'?"否":"是"
            );
        },
        title: '是否由系统计费',
        width:120
       },
       {
        key: 'IsRandClacFee',
        render:(record:WaterProduct)=>{
            return (
                record.IsRandClacFee.trim()===''?'':record.IsRandClacFee==='0'?"否":"是"
            );
        },
        title: '是否随机收费项目',
        width:140
       },
       {
        key: 'IsAddedTax',
        render:(record:WaterProduct)=>{
            return (
                record.IsAddedTax.trim()===''?'':record.IsAddedTax.trim()==='0'?"否":"是"
            );
        },
        title: '是否增值税项目',
        width:120
        },
        {
            key:"BillTypeId",
           dataIndex:"BillTypeId" ,
            render:(record:WaterProduct)=>{
                const billType = this.props.GlobalWaterProductStore!.BillTypeMenuList.find(x=>String(x.BillTypeId)===String(record));
                if (billType===null||billType===undefined) {
                    return (
                        ""
                    );
                 }
                return(
                    billType.BillTypeName
                )
            },
            title:"票据类型",
            width:120
        },
       {
        dataIndex: 'AccountCode',
        key: 'AccountCode',
        title: '会计科目',
        width:100
       },
       {
        dataIndex: 'ActualPrice',
        key: 'ActualPrice   ',
        title: '价格',
        width:100
       },
       {
        key: 'action',
        render: (text: any, record: WaterProduct, index: number) => {
            return (
                <div style={{display: record.IsDelete.trim()==='0'?"inline-block":"none"}}>
                        <a
                         href={'javascript:;'}
                         onClick = {this.uiAction.Edit}
                         id = {record.ProductItemId}
                         title = "编辑"
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                </div>
            );
        },
        title: '操作',
        width:50
       },
       {
        key: 'State',
        render:(record:WaterProduct)=>{
            return (
                record.IsDelete.trim()==='0'?"已关联":"未关联"
            );
        },
        title: '状态',
        // width:100
        }
    );
 
    constructor(props:IWaterProductTableProps){

        super(props)

        this.uiAction = new WaterProductTableUiAction(props);

        this.getRowKey =this.getRowKey.bind(this);

        this.onCheckboxChange = this.onCheckboxChange.bind(this);

        this.onCheckboxCancel = this.onCheckboxCancel.bind(this);

        this.onCheckboxOk = this.onCheckboxOk.bind(this);

        this.state={
            productItemId:""
        }


    }
   

    public render(){
        return(
            <Table<WaterProduct>
                bordered={true}
                columns={this.columns}
                dataSource = {this.props.GlobalWaterProductStore!.WaterProductList.slice()}
                loading={
                    {
                        spinning:this.props.GlobalWaterProductStore!.isLoading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:this.props.GlobalWaterProductStore!.isLoading?[]:undefined
                }}
                rowKey = {this.getRowKey} 
                className = {"ori-table ori-table-scroll"}
                pagination = {false}
                scroll={{x:1180,y:100}}
            />
        );
    }

    @action
    private onCheckboxChange(itemId:string,e:CheckboxChangeEvent){
        if (e.target.checked) {
            this.props.onChecked(e.target.value);
        }else{
            this.setState({
                productItemId:itemId
            })
        }

        
    }

    @action
    private onCheckboxCancel(e: React.MouseEvent<any>){
        this.setState({
            productItemId:""
        })
    }

    @action
    private onCheckboxOk(model:WaterProduct){

        this.props.onCancelChecked(model);

        this.setState({
            productItemId:""
        })
    }


    @action
    private getRowKey(record: WaterProduct, index: number):string{

        return record.ProductItemId
    }



}