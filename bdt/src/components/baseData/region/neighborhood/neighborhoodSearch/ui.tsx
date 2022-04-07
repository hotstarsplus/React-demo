import { Input, Select, } from "antd";
import { inject, observer } from "mobx-react";
import * as React from 'react'
import {INeighborhoodSearchprops} from './interface';
import { NeighborhoodSearchUiAction} from './uiAction'


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
 * 缴费网点查询组件视图
 */
@inject("GlobalNeighborhoodStore")
@observer
export class NeighborhoodSearchView extends React.Component<INeighborhoodSearchprops,ISearchGroupsLayoutState>{

    private uiAction:NeighborhoodSearchUiAction;
    /**
     * 构造方法
     */
    constructor(props:INeighborhoodSearchprops){
        super(props);
        this.uiAction = new NeighborhoodSearchUiAction(props);
        this.state={
            optionType:"缴费网点名称"
        }
    }
    public render(){
        return(
            <div className="ori-single-search-nobg">
            <Input.Search
                addonBefore={(
                    <Select style={{ minWidth: "80px" }} defaultValue="缴费网点名称" onSelect={this.onSelectChange}>
                        <Select.Option value="缴费网点名称" title="缴费网点名称">缴费网点名称</Select.Option>
                        <Select.Option value="编码">编码</Select.Option>
                        <Select.Option value="联系人">联系人</Select.Option>
                        <Select.Option value="地址">地址</Select.Option>

                    </Select>
                )}
                placeholder="请输入"
                onChange={this.uiAction.neighborhoodInputOnChange.bind(undefined, this.state.optionType)}
                style={{ width: "360px" }}
                defaultValue={this.uiAction.backName(this.state.optionType)}
                className="ori-single-search-ix"
                onSearch={this.search}
            />
        </div>
        )
    }
    private search=(value:any)=>{
        this.uiAction.neighborhoodSearch(value,this.state.optionType)
    }
    // /**
    //  * 根据下拉选择值返回input
    //  */
    // private renderInput = () => {
    //     switch(this.state.optionType){
    //         case "缴费网点名称":
    //         return(
    //             <Input
    //                 style={{width:"216px",marginRight:"20px"}}
    //                 placeholder="请输入"
    //                 defaultValue={this.uiAction.NeighborhoodName}
    //                 onChange={this.uiAction.NeighborhoodNameInputChange}
    //                 suffix={(
    //                     <Button onClick={this.uiAction.NeighborhoodNameSearch} type="primary">
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
    //                 defaultValue={this.uiAction.NeighborhoodId}
    //                 onChange={this.uiAction.NeighborhoodIdInputChange}
    //                 suffix={(
    //                     <Button onClick={this.uiAction.NeighborhoodIdSearch} type="primary">
    //                         <Icon type="search" />
    //                     </Button>
    //                 )}
    //             />
    //         )
    //         case "联系人":
    //         return(
    //             <Input
    //                 style={{width:"216px",marginRight:"20px"}}
    //                 placeholder="请输入"
    //                 defaultValue={this.uiAction.NeighborhoodLinkMan}
    //                 onChange={this.uiAction.NeighborhoodLinkManInputChange}
    //                 suffix={(
    //                     <Button onClick={this.uiAction.NeighborhoodLinkManSearch} type="primary">
    //                         <Icon type="search" />
    //                     </Button>
    //                 )}
    //             />
    //         )
    //         case "地址":
    //         return(
    //             <Input
    //                 style={{width:"216px",marginRight:"20px"}}
    //                 placeholder="请输入"
    //                 defaultValue={this.uiAction.NeighborhoodAddress}
    //                 onChange={this.uiAction.NeighborhoodAddressInputChange}
    //                 suffix={(
    //                     <Button onClick={this.uiAction.NeighborhoodAddressSearch} type="primary">
    //                         <Icon type="search" />
    //                     </Button>
    //                 )}
    //             />
    //         )
    //     default:
    //         return '';
    //     }
    // }
    /**
     * 下拉框选中项改变时回调
     */
    private onSelectChange = (value:any) =>{
        this.setState({
            optionType:value,
        })
    }

}