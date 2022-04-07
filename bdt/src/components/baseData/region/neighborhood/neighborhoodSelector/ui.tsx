import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import {INeighborhoodTreeSelectProps} from "./interface";
import {NeighborhoodTreeSelectUiAction} from './uiAction'


/**
 * 下拉组件
 */
@inject("GlobalNeighborhoodStore")
@observer
export class NeighborhoodTreeSelect extends React.Component<INeighborhoodTreeSelectProps>{

    private uiAction:NeighborhoodTreeSelectUiAction
    /**
     * 构造方法
     */
    constructor(props:INeighborhoodTreeSelectProps){
        super(props);
        this.uiAction= new NeighborhoodTreeSelectUiAction(this.props);
    }

    public render(){
        console.log("NeighborhoodTreeSelect render()");
        return(
            <TreeSelect
                showSearch={true}     // 显示搜索框
                onChange = {this.props.onChange}
                value = {this.props.value||""}
                treeData = {this.props.list}
                labelInValue={false}
                disabled = {this.props.disabled}
                treeDefaultExpandAll={true}  // 默认展开所有树节点
                placeholder={"请选择"}
                searchPlaceholder={"搜索"}
                allowClear={true}
                onSelect={this.uiAction.onSelect}
            />
        );
    }


}