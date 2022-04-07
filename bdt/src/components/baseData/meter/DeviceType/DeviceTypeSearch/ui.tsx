import { Input, Select } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { IDeviceTypeSearchProps } from "./interface";
import { DeviceTypeSearchUiAction } from "./uiAction";


interface ISearchGroupsLayoutState{
    optionType: string;
}

@inject("GlobalDeviceTypeStore")
@observer
export class DeviceTypeSearchView extends React.Component<IDeviceTypeSearchProps,ISearchGroupsLayoutState>{
    private uiAction:DeviceTypeSearchUiAction;
    constructor(props:IDeviceTypeSearchProps){
        super(props);
        this.uiAction = new DeviceTypeSearchUiAction(props);
        this.state={
            optionType:"类型编码"
        }
    }

    public render(){
        return (
            <div className="ori-single-search-nobg">
                <Input.Search
                    addonBefore={(
                        <Select style={{ minWidth: "80px" }} defaultValue="类型编码" onSelect={this.onSelect}>
                            <Select.Option value="类型编码" title="类型编码">类型编码</Select.Option>
                            <Select.Option value="类型名称">类型名称</Select.Option>

                        </Select>
                    )}
                    placeholder="请输入"
                    onChange={this.uiAction.deviceTypeInputOnChange.bind(undefined, this.state.optionType)}
                    style={{ width: "360px" }}
                    defaultValue={this.uiAction.backName(this.state.optionType)}
                    className="ori-single-search-ix"
                    onSearch={this.search}
                />
            </div>

        )
    }

    private search=(value:any)=>{
        this.uiAction.deviceTypeSearch(value,this.state.optionType)
    }
    
    private onSelect = (value: any) => {
        this.setState({
            optionType: value,
        })
    }
}