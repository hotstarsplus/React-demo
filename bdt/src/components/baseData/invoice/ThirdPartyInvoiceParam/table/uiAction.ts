import { action } from "mobx";
import { ThirdPartyInvoiceParam } from "../entity";
import { IThirdPartyInvoiceParamTableProps } from "./interface";




export class ThirdPartyInvoiceParamTableUiAction{


    private props:IThirdPartyInvoiceParamTableProps;


    constructor(props:IThirdPartyInvoiceParamTableProps){
        this.props = props;
        this.TableOnChange = this.TableOnChange.bind(this);
        this.EditItem = this.EditItem.bind(this);
    }

    /**
     * 表格复选框改变事件
     * @param selectedRowKeys 
     * @param selectedRows 
     */
    @action
    public TableOnChange(selectedRowKeys: string[] | number[], selectedRows: object[]){

        const keys = selectedRowKeys as string[];

        const rows = selectedRows as ThirdPartyInvoiceParam[];

        this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRowKeys = keys;

        this.props.GlobalThirdPartyInvoiceParamDomainStore!.TableSelectedRows = rows;

    };

    /**
     * 编辑
     */
    @action
    public EditItem(event: React.MouseEvent<HTMLAnchorElement>){
        
        const id = event.currentTarget.id;

        const value = this.props.GlobalThirdPartyInvoiceParamDomainStore!.List.find((x)=>x.ProductId===id);

        this.props.GlobalThirdPartyInvoiceParamDomainStore!.CurrentEditItem = value!;

        this.props.onEdit();

    }





}