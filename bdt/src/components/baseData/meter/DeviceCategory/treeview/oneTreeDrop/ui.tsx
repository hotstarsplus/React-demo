import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { TreeTypeUiEntity } from "../entity";
import { IOneTreedownselectProps } from "./interface";

/**
 * 某种类型的树
 */
@inject("TreeTypeStore")
@observer
export class OneTreedownselect extends React.Component<IOneTreedownselectProps>{

    constructor(props: IOneTreedownselectProps) {
        super(props);
    }

    public render() {
        return (
            <TreeSelect
                onChange={this.props.onChange}
                value={this.props.value || ""}
                labelInValue={false}
                placeholder="请选择"
                onSelect={this.props.onSelect}
                treeDefaultExpandedKeys={[this.props.TreeTypeStore!.pushInputid]}
                style={{ width: "100%" }}
                dropdownStyle={this.handleOnDropDowmStyle(this.props.list)}
            >
                {this.loop(this.props.list!)}
            </TreeSelect>
        );
    }

    private loop(datas: TreeTypeUiEntity[]): React.ReactNode {

        return datas.map((model) => {
            console.log("model:",model);
            if (model.children && model.children.length) {
                if (model.IsCategory === "1") {
                    return (
                        <TreeSelect.TreeNode
                            key={model.NodeId} value={model.NodeId} title={model.NodeName} disabled={true} >
                            {this.loop(model.children)}
                        </TreeSelect.TreeNode>
                    );
                } else {
                    return (
                        <TreeSelect.TreeNode key={model.NodeId} value={model.NodeId} title={model.NodeName} >
                            {this.loop(model.children)}
                        </TreeSelect.TreeNode>
                    );
                }
            } else {
                return <TreeSelect.TreeNode key={model.NodeId} value={model.NodeId} title={model.NodeName} />;
            }
        }
        )
    }

    /**
     * 下拉框样式
     */
    private handleOnDropDowmStyle = (value: any): any => {
        return { maxHeight: value.length > 6 ? "240px" : "200px", maxWidth: "300px" };
    }
}