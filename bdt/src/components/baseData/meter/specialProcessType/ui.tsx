// import { BackTop, } from "antd";
import { Button,  message, TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import { OridStores, VerThr } from "orid";
import * as React from "react";
import { ISpecialProgressTypeViewProps } from "./interface";
import { SpecialProcessTypeDialogView } from "./specialProcessTypeDialog/ui";
import { SpecialProgressTypeTableView } from "./specialProgressTypeTable/ui";
import { SpecialProgressTypeListViewUiAction } from "./uiAction";


/**
 * 水表特殊型号视图
 */
@inject("GlobalSpecialProgressTypeStore")
@observer
export class SpecialProgressTypeView extends React.Component<ISpecialProgressTypeViewProps>{
    
    private uiAction:SpecialProgressTypeListViewUiAction;
    
    /**
     * 构造方法
     * @param props
     */
    constructor(props:ISpecialProgressTypeViewProps){
        super(props);
        this.state = {
            cardDomNode: undefined,
        }
        this.uiAction=new SpecialProgressTypeListViewUiAction(props);
    }
    public componentWillMount(){
        message.destroy();
        this.uiAction.getCompanyName();
    }
    
    public render(){
        return(
            <>
            <VerThr style={{ background: "#fff", padding: "16px" }}>
                <VerThr.top  style={{ padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization?
                    OridStores.authStore.currentOperator.OrganizationCodes.length!==0?
                    <>
                    <TreeSelect dropdownStyle={{width:'280px',maxHeight:'300px',zIndex:0}} treeDefaultExpandAll={true} value={this.props.GlobalSpecialProgressTypeStore!.InfoName}  style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                    {this.renderTreeNode(this.props.GlobalSpecialProgressTypeStore!.CompanyNameData)}
                    </TreeSelect>
                    <Button icon="search"  shape="circle" style={{marginLeft:'8px'}} onClick={this.uiAction.onSearchData}/>
                    </>
                    :''
                    :''}
                </VerThr.top>
                <VerThr.middle >
                <SpecialProgressTypeTableView onEdit={this.uiAction.edit} />
                <SpecialProcessTypeDialogView
                        handleCancel={this.uiAction.cancel}
                        handleOk={this.uiAction.save}
                        visiable={this.uiAction.isVisiableModal}
                    />
                </VerThr.middle>
            </VerThr>
                    
                {/* <div className = "tableList">
                </div>
                // <BackTop target={this.uiAction.backToptarget} visibilityHeight={400} /> */}
                
                    </>
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
    
}