import { Select } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { DropdownViewList } from "../entity";
import { IDropdownViewProps } from "./interface";

/**
 * 设备种类下拉选
 */
@inject("TreeTypeStore")
@observer
export class DropdownView extends React.Component<IDropdownViewProps>{

    public componentDidMount(){
        this.props.TreeTypeStore!.LoadData();
    }
    public render(){
        const datas = this.props.TreeTypeStore!.DropdownViewlist;
        return(
            <Select
            onChange = {this.props.onChange}
            value = {this.props.value}
            >
                {
                    datas.map((item:DropdownViewList)=>{
                        return (
                            <Select.Option key={item.CategoryId} value = {item.CategoryId} title={item.CategoryName}  >
                                {item.CategoryName}
                            </Select.Option>
                        )
                    })
                }
            </Select>
        )
    }
}