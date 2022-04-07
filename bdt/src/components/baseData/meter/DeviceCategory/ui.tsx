import { Button, message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import React from "react";
import { DeviceCategoryTableView } from "./DeviceCategoryTable/ui";
import * as ui from "./DeviceTypeCommonParaDialog/ui";
import { IDeviceCategoryProps } from "./interface";
import { DeviceCategoryListUiAction } from "./uiAction";


@inject("GlobalDeviceCategoryStore")
@observer
export class DeviceCategoryView extends React.Component<IDeviceCategoryProps>{

    private uiAction:DeviceCategoryListUiAction;

    constructor(props:IDeviceCategoryProps){
        super(props);
        this.uiAction = new DeviceCategoryListUiAction(props);
    }
    public componentWillMount(){
        message.destroy()
        this.props.GlobalDeviceCategoryStore!.getCompanyName()
    }

    public render(){
        return(
            <VerThr style={{background:"#fff",padding:"16px"}}>
                <VerThr.top  style={{padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization?
                    OridStores.authStore.currentOperator.OrganizationCodes.length!==0?
                    <>
                    <TreeSelect dropdownStyle={{width:'280px',zIndex:0,maxHeight:'300px'}} treeDefaultExpandAll={true} value={this.props.GlobalDeviceCategoryStore!.InfoName}  style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                    {this.renderTreeNode(this.props.GlobalDeviceCategoryStore!.CompanyNameData)}
                    </TreeSelect>
                    <Button icon="search"  shape="circle" style={{marginLeft:'8px'}} onClick={this.onSearchData}/>
                    </>
                    :''
                    :''}
                </VerThr.top>
                <VerThr.middle>
                    <DeviceCategoryTableView
                        onCheck={this.uiAction.Check}
                    />
                </VerThr.middle>
                
                <ui.DeviceTypeCommonFieldDialogView
                    visible={this.uiAction.isVisiableModal}
                    dialogTitle={this.uiAction.dialogShowName}
                    handleCancel={this.uiAction.cancel}
                    handleOk={this.uiAction.cancel}
                />
                
            </VerThr>
        )
    }
    private onSearchData=()=>{
        this.props.GlobalDeviceCategoryStore!.CompanyName=this.props.GlobalDeviceCategoryStore!.Name
        this.props.GlobalDeviceCategoryStore!.loadData()
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

    // /**
    //  * 点击map框中的确定
    //  */
    // private HideCommon() {

    //     this.uiAction.isVisiableModal = false;

    // }

}