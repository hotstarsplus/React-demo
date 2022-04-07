import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IRegion } from "../entity";
import { IRegionTreeSelectProps } from "./interface";


/**
 * 下拉组件
 */
@inject("GlobalRegionStore")
@observer
export class RegionTreeSelect extends React.Component<IRegionTreeSelectProps>{

    /**
     * 构造方法
     */
    constructor(props: IRegionTreeSelectProps) {
        super(props);
        this.loop = this.loop.bind(this)

    }

    public render() {
        console.log("RegionTreeSelect render()");
        return (
            <TreeSelect
                showSearch={true}     // 显示搜索框
                onChange={this.props.onChange}
                value={this.props.value}
                // treeData={this.props.list}
                labelInValue={false}
                disabled={this.props.disabled}
                treeDefaultExpandAll={false}  // 默认关闭所有树节点
                placeholder={"请选择"}
                searchPlaceholder={"搜索"}
                allowClear={true}
                treeNodeFilterProp='title' // 输入项过滤对应的 treeNode 属性, value或者title
                dropdownStyle={
                    {
                        maxHeight: this.props.GlobalRegionStore!.RegionList.length > 6 ? "240px" : "200px",
                        maxWidth: "300px"
                    }}>
                {this.loop(this.props.GlobalRegionStore!.UiRegionList)}
            </TreeSelect>
        );
    }
    private loop(list: IRegion[]): React.ReactNode[] {

        return list.map((value) => {
            if (value.children !== undefined && value.children !== null) {
                return (
                    <TreeSelect.TreeNode
                        key={value.RegionId}
                        value={value.RegionId}
                        title={value.RegionName} >
                        {
                            this.loop(value.children)
                        }
                    </TreeSelect.TreeNode>
                )
            }
            return (<TreeSelect.TreeNode
                value={value.RegionId}
                title={value.RegionName}
                key={value.RegionName} />)
        })
    }
}