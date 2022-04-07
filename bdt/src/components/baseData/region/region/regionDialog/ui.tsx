import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import  RegionFormView  from "../regionForm/ui";
import { IRegionDialogProps } from "./interface";
import { RegionDialogUiAction } from "./uiAction";



/**
 * 新增/编辑窗口
 */
@inject("GlobalRegionStore")
@observer
export class RegionDialogView extends React.Component<IRegionDialogProps>{

    private uiAction:RegionDialogUiAction;
    /**
     * 构造方法
     */
    constructor(props:IRegionDialogProps){

        super(props);

        this.uiAction = new RegionDialogUiAction(props);

        this.state={
            visiable:false
        }

    }

    // public componentWillReceiveProps(nextProps:any){
    //     console.log("123",nextProps);
    // }

    public render(){
        return(
            <Modal 
                className="bdt-select-tree-overflow"
                title ={this.props.title}
                visible = {this.props.visible}
                onOk = {this.uiAction.HandleOk}
                onCancel = {this.props.handleCancel}
                okText="确定"
                cancelText="取消"
                destroyOnClose={true}
            >
                <RegionFormView 
                 GlobalRegionStore={this.props.GlobalRegionStore!}
                 getUiAction = {this.uiAction.GetSonUiAction}
                 GetMaxSortNo={this.props.GetMaxSortNo}
                 />
            </Modal>
        );
    }


}