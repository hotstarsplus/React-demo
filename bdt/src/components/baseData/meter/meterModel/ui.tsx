import {BackTop, Button,  message, TreeSelect  } from 'antd';
import { inject,observer } from 'mobx-react';
import { OridStores, VerThr } from "orid";
import * as React from 'react';
import '../../../index.scss';
import { IMeterModelViewProps } from './interface';
import { MeterModelDialog } from './meterModelDialog/ui';
import { MeterModelTableView } from './meterModelTable/ui';
import { MeterModelViewUiAction } from './uiAction';


@inject('GlobalMeterModelStore')
@observer
export class MeterModelView extends React.Component<IMeterModelViewProps>{
    

    private uiAction: MeterModelViewUiAction;

    constructor(props:any){
        super(props);
        this.uiAction = new MeterModelViewUiAction(props);
    }
    public componentWillMount(){
        message.destroy()
        this.uiAction.getCompanyName()
    }

    public render(){
        console.log('render MeterModelView');
        return(
            <VerThr style={{background:"#fff",padding:"16px"}}>
                <VerThr.top style={{padding: "0px 8px 16px 0px" }}>
                    {OridStores.authStore.currentOperator.IsMultiOrganization?
                    OridStores.authStore.currentOperator.OrganizationCodes.length!==0?
                    <>
                <TreeSelect dropdownStyle={{width:'280px',zIndex:0,maxHeight:'300px'}} treeDefaultExpandAll={true} value={this.props.GlobalMeterModelStore!.InfoName}  style={{ width: '280px' }} onChange={this.uiAction.selectedContent}>
                    {this.renderTreeNode(this.props.GlobalMeterModelStore!.CompanyNameData)}
                    </TreeSelect>
                    <Button icon="search"  shape="circle" style={{marginLeft:'8px'}} onClick={this.uiAction.onSearchData}/>
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick} style={{float:'right'}}>
                            新建
                        </Button>
                        </>
                        :
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                            新建
                        </Button>
                        :
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                            新建
                        </Button>}
                </VerThr.top>
                <VerThr.middle>
                    <MeterModelTableView 
                    onEdit = {this.uiAction.onEditClick}/>
                 </VerThr.middle>
                    <BackTop target={this.uiAction.targetFunc}  visibilityHeight={400} />
                <MeterModelDialog
                    handleCancel={this.uiAction.cancelAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
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
    
    
}