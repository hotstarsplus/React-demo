import { Input, Select, } from "antd";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridSearchPC.scss';
import React from "react";
import { IMeterTypeSearchViewProps } from "./interface";
import { MeterTypeSearchUiAction } from "./uiAction";

// const InputGroup = Input.Group
// const Option = Select.Option

interface ISearchGroupsLayoutState {
    optionType: string;
}

@inject("GlobalMeterTypeStore")
@observer
export class MeterTypeSearchView extends React.Component<IMeterTypeSearchViewProps, ISearchGroupsLayoutState>{
    private uiAction: MeterTypeSearchUiAction;
    constructor(props: IMeterTypeSearchViewProps) {
        super(props);
        this.uiAction = new MeterTypeSearchUiAction(props);
        this.state = {
            optionType: '水表类型名称',
        }
    }

    public render() {
        return (
            // <InputGroup compact={true} className="single-conditional-query" style={{ marginLeft: "100px" }}>
            //     <Select defaultValue="水表类型" onSelect={this.onSelect} style={{ minWidth: "100px" }}>
            //         <Option value="水表类型">水表类型</Option>
            //         <Option value="编码">编码</Option>
            //     </Select>
            //     {this.renderInput()}
            // </InputGroup>

            <div className="ori-single-search-nobg">
                <Input.Search
                    addonBefore={(
                        <Select style={{ minWidth: "80px" }} defaultValue="水表类型名称" onSelect={this.onSelect}>
                            <Select.Option value="水表类型名称" title="水表类型名称">水表类型名称</Select.Option>
                            <Select.Option value="编码">编码</Select.Option>
                        </Select>
                    )}
                    placeholder="请输入"
                    onChange={this.uiAction.meterTypeInputOnChange.bind(undefined, this.state.optionType)}
                    style={{ width: "360px" }}
                    defaultValue={this.uiAction.backName(this.state.optionType)}
                    className="ori-single-search-ix"
                    onSearch={this.search}
                />
            </div>
        )
    }

    private search = (value: string ) => {
        this.uiAction.meterTypeSearch(value, this.state.optionType)
    }
    private onSelect = (value: any) => {
        this.setState({
            optionType: value,
        })
        // private renderInput = () => {
        //     switch (this.state.optionType) {
        //         case "水表类型":
        //             return (
        //                 <Input
        //                     style={{ width: "216px", marginRight: "20px" }}
        //                     placeholder="请输入"
        //                     defaultValue={this.uiAction.meterTypeName}
        //                     onChange={this.uiAction.meterTypeNameInputOnChange}
        //                     suffix={(
        //                         <Button onClick={this.uiAction.meterTypeNameSearch} type="primary">
        //                             <Icon type="search" />
        //                         </Button>
        //                     )}
        //                 />
        //             )
        //         case "编码":
        //             return (
        //                 <Input
        //                     style={{ width: "216px", marginRight: "20px" }}
        //                     placeholder="请输入"
        //                     defaultValue={this.uiAction.meterTypeId}
        //                     onChange={this.uiAction.meterTypeIdInputChange}
        //                     suffix={(
        //                         <Button onClick={this.uiAction.meterTypeIdSearch} type="primary">
        //                             <Icon type="search" />
        //                         </Button>
        //                     )}
        //                 />
        //             )
        //         default:
        //             return '';
        //     }
        // }
    }
}