import { Divider, Icon,Popconfirm,Table,   } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { ProductType } from "../entity";
import { IProductTypeTableProps } from "./interface";
import { ProductTypeTableUiAction } from "./uiAction";


/**
 * 产品类型表
 */
export class ProductTypeTable extends Table<ProductType>{}


@inject("GlobalProductTypeStore")
@observer
export class ProductTypeTableView extends React.Component<IProductTypeTableProps>{

    private uiAction:ProductTypeTableUiAction;


    private columns:Array<ColumnProps<ProductType>>=Array<ColumnProps<ProductType>>(
        {
            dataIndex:"ProductTypeId",
            key:"ProductTypeId",
            title:"产品类型编码",
            width:"30%"
        },
        {
            dataIndex:"ProductTypeName",
            key:"ProductTypeName",
            title:"产品类型名称",
            width:"40%"
        },
        {
            key:"action",
            render:(text:any,record:ProductType,index:number) => {
                return(
                    <div style={{display:record.IsSystemCode==="1"?"none":"inline-block"}} >
                        
                        <a
                            href={'javascript:;'}
                            id={record.ProductTypeId}
                            onClick={this.uiAction.Edit}
                            title = {"编辑"}
                        >
                            <Icon type="edit" style={{color:'#1890ff'}}/>
                        </a>
                        <Divider type="vertical" />
                    <Popconfirm  
                        title="确定要删除吗?"  
                        onConfirm={this.uiAction.Delete.bind(undefined,record.ProductTypeId)}  
                        okText="确认" 
                        cancelText="取消" 
                    >
                        <a
                            href={'javascript:;'}
                            title = {"删除"}
                        >
                            <Icon type="delete" style={{color:'#1890ff'}}/>
                        </a>
                        </Popconfirm >
                    </div>
                );
            },
            title:"操作",
            width:"30%"
        }
        
    )


    constructor(props:IProductTypeTableProps){
        super(props);
        this.uiAction = new ProductTypeTableUiAction(props);
        this.getRowIndex = this.getRowIndex.bind(this);
    }




    public render(){
        const  store = this.props.GlobalProductTypeStore;
        return(
            <ProductTypeTable 
                className = {"ori-table ori-table-scroll"}
                columns = {this.columns}
                dataSource = {store!.ProductTypeList.slice()}
                loading = {store!.IsLoading}
                locale = {{
                    emptyText:store!.IsLoading?[]:undefined
                }}
                rowKey = {this.getRowIndex}
                scroll = {{y:100}}
                pagination={false}
            />
        );
    }

    /**
     * 获取行下标
     * @param record 
     * @param index 
     */
    private getRowIndex(record:ProductType,index:number):string{
        return record.ProductTypeId;
    }


}