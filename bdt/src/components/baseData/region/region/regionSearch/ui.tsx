import { Input, Select, } from "antd";
import { inject, observer } from "mobx-react";
import 'orid/lib/style/standStyle/oridSearchPC.scss';
import * as React from 'react'
import { IRegionSearchprops } from './interface';
import { RegionSearchUiAction } from './uiAction'


/**
 * 创建查询组件
 */
// const InputGroup =Input.Group
// const Option = Select.Option
/**
 * 查询接口
 */
interface ISearchGroupsLayoutState {
    optionType: string;
}
/**
 * 片区查询组件视图
 */
@inject("GlobalRegionStore")
@observer
export class RegionSearchView extends React.Component<IRegionSearchprops, ISearchGroupsLayoutState>{

    private uiAction: RegionSearchUiAction;

    constructor(props: IRegionSearchprops) {
        super(props);
        this.uiAction = new RegionSearchUiAction(props);
        this.state = {
            optionType: "片区名称"
        }
    }
    public render() {
        return (
            <div className="ori-single-search-nobg">
                <Input.Search
                    addonBefore={(
                        <Select
                            style={{ minWidth: "80px" }}
                            defaultValue="片区名称"
                            onSelect={this.onSelect}>
                            <Select.Option value="片区名称" title="片区名称">片区名称</Select.Option>
                            <Select.Option value="编码">编码</Select.Option>
                        </Select>
                    )}
                    placeholder="请输入"
                    onChange={this.uiAction.RegionInputOnChange.bind(undefined, this.state.optionType)}
                    style={{ width: "360px" }}
                    defaultValue={this.uiAction.BackName(this.state.optionType)}
                    className="ori-single-search-ix"/>
            </div>
            // <InputGroup compact={true} className="single-conditional-query" style={{bottom:'32px', marginLeft: "100px" }}>
            //     <Select defaultValue="片区名称" onSelect={this.onSelect} style={{ minWidth: "100px"}}>
            //         <Option value="片区名称">片区名称</Option>
            //         <Option value="编码">编码</Option>
            //     </Select>
            //     {this.renderInput()}
            // </InputGroup >
        )
    }
    // private search=(value:any)=>{
    //     this.uiAction.regionSearch(value,this.state.optionType)
    // }

    // private renderInput = () => {
    //     switch(this.state.optionType){
    //         case "片区名称":
    //         return(
    //             <Input
    //                 style={{width:"216px",marginRight:"20px"}}
    //                 placeholder="请输入"
    //                 defaultValue={this.uiAction.RegionName}
    //                 onChange={this.uiAction.RegionNameInputChange}
    //                 suffix={(
    //                     <Button onClick={this.uiAction.RegionNameSearch} type="primary">
    //                         <Icon type="search" />
    //                     </Button>
    //                 )}
    //             />
    //         )
    //         case "编码":
    //         return(
    //             <Input
    //                 style={{width:"216px",marginRight:"20px"}}
    //                 placeholder="请输入"
    //                 defaultValue={this.uiAction.RegionId}
    //                 onChange={this.uiAction.RegionIdInputChange}
    //                 suffix={(
    //                     <Button onClick={this.uiAction.RegionIdSearch} type="primary">
    //                         <Icon type="search" />
    //                     </Button>
    //                 )}
    //             />
    //         )
    //     default:
    //         return '';
    //     }
    // }

    private onSelect = (value: any) => {
        this.setState({
            optionType: value,
        })
    }

}