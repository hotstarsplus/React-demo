import { Button, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import * as React from "react";
import { ProductTypeDialog } from "../productTypeDialog/ui";
import { ProductTypeTableView } from "../productTypeTable/ui";
import { IProductTypeListViewProps } from "./interface";
import { ProductTypeListViewUiAction } from "./uiAction";


@inject("GlobalProductTypeStore")
@observer
export class ProductTypeListView extends React.Component<IProductTypeListViewProps>{

    private uiAction:ProductTypeListViewUiAction;

    constructor(props:IProductTypeListViewProps){
        super(props);
        this.uiAction = new ProductTypeListViewUiAction(this.props.GlobalProductTypeStore!);
    }
    public componentWillMount(){
        message.destroy()
        this.props.GlobalProductTypeStore!.getCompanyName()
    }

    public render(){
        return(
            <VerThr style={{backgroundColor:"#fff",padding:"16px"}} >
                <VerThr.top style={{paddingBottom:"12px"}} >
                {OridStores.authStore.currentOperator.IsMultiOrganization?
                    OridStores.authStore.currentOperator.OrganizationCodes.length!==0?
                    <>
                    <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalProductTypeStore!.InfoName}  style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                    {this.renderTreeNode(this.props.GlobalProductTypeStore!.CompanyNameData)}
                    </TreeSelect>
                    <Button icon="search"  shape="circle" style={{marginLeft:'8px'}} onClick={this.onSearchData}/>
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtnClick} style={{float:'right'}}>
                    新建
                    </Button>
                    </>
                    :
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtnClick} >
                    新建
                    </Button>
                    :
                    <Button icon="plus" type="primary" onClick={this.uiAction.addbtnClick} >
                    新建
                    </Button>}
                    
                </VerThr.top>
                <VerThr.middle>
                    <ProductTypeTableView 
                            onEdit = {this.uiAction.editClick}
                        />
                </VerThr.middle>
                    <ProductTypeDialog
                            handleOk = {this.uiAction.saveClick}
                            handleCancel = {this.uiAction.cancleAddOrEdit}
                            visible = {this.uiAction.IsVisiableModal}
                            title={this.uiAction.modaltitle}
                        />
            </VerThr>
        );
    }
    private renderTreeNode = (tableData: any[]): any => tableData.map(item => {
        if (item.Children && item.Children.length !== 0) {
            return (
                <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName}>
                    {this.renderTreeNode(item.Children)}
                </TreeSelect.TreeNode>);
        }
        return <TreeSelect.TreeNode key={item.OrganitionCode} value={item.OrganitionCode} title={item.OrganizationName} />;
    })
    private onSearchData=()=>{
        this.props.GlobalProductTypeStore!.CompanyName=this.props.GlobalProductTypeStore!.Name
        this.props.GlobalProductTypeStore!.LoadData();
    }

}