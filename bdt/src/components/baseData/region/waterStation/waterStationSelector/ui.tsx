import { TreeSelect } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IWaterStationTreeSelectProps } from "./interface";
import { WaterStationTreeSelectUiAction } from './uiAction';

/**
 * 下拉组件
 */
@inject("GlobalWaterStationStore")
@observer
export class WaterStationTreeSelect extends React.Component<IWaterStationTreeSelectProps>{

    private uiAction: WaterStationTreeSelectUiAction
    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IWaterStationTreeSelectProps) {
        super(props);
        this.uiAction = new WaterStationTreeSelectUiAction(this.props);
    }


    public render() {
        return (
            <TreeSelect
                showSearch={true}     // 显示搜索框
                onChange={this.handleOnChange}
                value={this.props.value || ""}
                treeData={toJS(this.props.list)}
                labelInValue={false}
                disabled={this.props.disabled}
                treeDefaultExpandAll={true}  // 默认展开所有树节点
                placeholder={this.props.GlobalWaterStationStore!.isEditModal?"":"请选择"}
                searchPlaceholder={"搜索"}
                allowClear={true}
                onSelect={this.uiAction.onSelect}
                dropdownStyle={{maxHeight:"200px",maxWidth:'300px'}}
            />
        )
    }
   
/**
 * 选择框的值改变
 */
private handleOnChange=(value: any, label: any)=>{
    console.log("onChange:"+value);
    this.setState({
        value,
    })
    this.props.setFieldsValue!({
        FatherId:value === undefined?"":value,
    })
}
}