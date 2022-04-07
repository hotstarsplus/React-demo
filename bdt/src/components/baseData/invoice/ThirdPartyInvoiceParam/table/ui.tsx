import { Icon, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridTablePC.scss';
import * as React from "react";
import { ThirdPartyInvoiceParam } from "../entity";
import { IThirdPartyInvoiceParamTableProps } from "./interface";
import { ThirdPartyInvoiceParamTableUiAction } from "./uiAction";


@inject("GlobalThirdPartyInvoiceParamDomainStore")
@observer
export class ThirdPartyInvoiceParamTable extends React.Component<IThirdPartyInvoiceParamTableProps>{


    private uiAction:ThirdPartyInvoiceParamTableUiAction;


    private columns:Array<ColumnProps<ThirdPartyInvoiceParam>> = Array<ColumnProps<ThirdPartyInvoiceParam>>(
        {
            key:"action",
            render:(text: any, record: ThirdPartyInvoiceParam, index: number)=>{
                return ( record.IsDelete==='0'?
                        <a  
                            id={record.ProductId}
                            onClick = {this.uiAction.EditItem}
                        >
                            <Icon type={"edit"} title={"编辑"} />
                        </a>
                        :"")
            },
            title:"操作",
            width:50
        },
        {
            dataIndex:"GoodsName",
            key:"GoodsName",
            title:"商品名称",
            width:200
        },
        {
            dataIndex:"TaxRate",
            key:"TaxRate",
            title:"税率",
            width:100
        },
        {
            dataIndex:"GoodsNo",
            key:"GoodsNo",
            title:"商品分类编码",
            width:200
        },
        {
            dataIndex:"Uom",
            key:"Uom",
            title:"计量单位",
            width:100
        },
        {
            key:"TaxPre",
            render:(text: any, record: ThirdPartyInvoiceParam, index: number)=>{
                return ( record.TaxPre==='0'?"否":"是")
            },
            title:"优惠政策标识",
            width:130
        },
        {
            dataIndex:"TaxPreCon",
            key:"TaxPreCon",
            title:"优惠政策类型",
            width:130
        },
        {
            dataIndex:"ZeroTaxName",
            key:"ZeroTaxName",
            title:"零税率标识",
            width:100
        },
        {
            dataIndex:"Spec",
            key:"Spec",
            title:"规格型号",
            width:100
        },
        {
            dataIndex:"GoodsNoVer",
            key:"GoodsNoVer",
            title:"编码版本号",
            width:100
        },
        {
            key:"PriceKind",
            render:(text: any, record: ThirdPartyInvoiceParam, index: number)=>{
                return ( record.PriceKind.trim()===""?"":record.PriceKind==="1"?"是":"否" );
            },
            title:"含税标志",
            // width:100
        },
        {
            dataIndex:"SortNo",
            key:"SortNo",
            title:"打印顺序",
        },
    );


    constructor(props:IThirdPartyInvoiceParamTableProps){
        super(props);
        this.uiAction = new ThirdPartyInvoiceParamTableUiAction(props);
        this.getRowKey = this.getRowKey.bind(this);
    }


    public render(){
        return(
            <Table<ThirdPartyInvoiceParam>
                bordered={true}
                columns = {this.columns}
                dataSource = {this.props.GlobalThirdPartyInvoiceParamDomainStore!.List.slice()} 
                rowSelection = {
                    {
                        onChange:this.uiAction.TableOnChange,
                        selectedRowKeys:this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRowKeys,
                        getCheckboxProps:(record: ThirdPartyInvoiceParam)=>{
                            return {disabled:record.IsDelete==='0'}
                        }
                    }
                }
                scroll={{x:1560,y:100}}
                loading={
                    {
                        spinning:this.props.GlobalThirdPartyInvoiceParamDomainStore!.Loading,
                        tip: "正在加载中..."
                    }
                }
                locale = {{
                    emptyText:this.props.GlobalThirdPartyInvoiceParamDomainStore!.Loading?[]:undefined
                }}
                pagination = {false}
                rowKey = {this.getRowKey}
                className = {"ori-table ori-table-scroll"}
            />
        )
    }


    private getRowKey(record:ThirdPartyInvoiceParam):string{
        return record.ProductId;
    }



}
