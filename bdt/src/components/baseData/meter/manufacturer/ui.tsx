import { Button,   message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr} from "orid";
import * as React from "react";
import { IManufacturerListViewProps } from "./interface";
import { ManufacturerDialogView } from "./manufacturerDialog/ui";
import { ManufacturerTableView } from "./manufacturerTable/ui";
import { ManufacturerListViewUiAction } from "./uiAction";

/**
 *  水表厂商视图
 */
@inject("GlobalManufacturerStore","GlobalManufacturerDomainStore")
@observer
export class ManufacturerView extends React.Component<IManufacturerListViewProps>{
    

    private uiAction: ManufacturerListViewUiAction;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IManufacturerListViewProps) {

        super(props);
        this.state = {
            cardDomNode: undefined,
        }
        this.uiAction = new ManufacturerListViewUiAction(props);

    }
    public componentWillMount(){
        message.destroy()        
        this.uiAction.getCompanyName();
    }

    public render() {
        return (
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization?
                    OridStores.authStore.currentOperator.OrganizationCodes.length!==0?
                    <>
                    <TreeSelect treeDefaultExpandAll={true} dropdownStyle={{width:'280px',zIndex:0,maxHeight:'300px'}} value={this.props.GlobalManufacturerStore!.InfoName}  style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                    {this.renderTreeNode(this.props.GlobalManufacturerStore!.CompanyNameData)}
                    </TreeSelect>
                    <Button icon="search"  shape="circle" style={{marginLeft:'8px'}} onClick={this.onSearchData}/>
                    <Button icon="plus" type="primary" onClick={this.uiAction.add} style={{float:'right'}}> 新建</Button>
                    </>
                    :<Button icon="plus" type="primary" onClick={this.uiAction.add} > 新建</Button>
                    :
                    <Button icon="plus" type="primary" onClick={this.uiAction.add} > 新建</Button>}
                </VerThr.top>
                <VerThr.middle>
                    <ManufacturerTableView loadData={this.uiAction.loadData} onEdit={this.uiAction.edit} />
                </VerThr.middle>
                {/* <BackTop target={this.uiAction.backTopTarget} visibilityHeight={400} /> */}
                <ManufacturerDialogView
                    handleCancel={this.uiAction.cancel}
                    handleOk={this.uiAction.save}
                    visiable={this.props.GlobalManufacturerStore!.isVisiableModal}
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
        this.props.GlobalManufacturerStore!.CompanyName=this.props.GlobalManufacturerStore!.Name
        this.uiAction.loadData();
    }

}