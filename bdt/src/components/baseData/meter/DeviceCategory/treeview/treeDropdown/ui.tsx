import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { TreeTypeUiEntity } from "../entity";
import { ITreedownselectProps } from "./interface";

/**
 * 设备种类/类型树
 */
@inject("TreeTypeStore")
@observer
export class Treedownselect extends React.Component<ITreedownselectProps>{

    constructor(props: ITreedownselectProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.TreeTypeStore!.LoadingData();
    }

    public render() {
        return (
            <TreeSelect
                onChange={this.props.onChange}
                value={this.props.value || ""}
                labelInValue={false}
                placeholder="请选择"
                onSelect={this.props.onSelect}
                treeDefaultExpandedKeys={["00","C001","C002","C003","C004","C005"]}
                style={{ width: "100%" }}
                dropdownStyle={this.handleOnDropDowmStyle(this.props.list)}
            >
                    <TreeSelect.TreeNode
                    treeDefaultExpandedKeys ={[]}
                        treeDefaultExpandAll={true}
                        disabled={true}
                        key={"00"}
                        value={"00"}
                        title={"全部"} >
                        {this.loop(this.props.list!)}
                    </TreeSelect.TreeNode>
            </TreeSelect>
        );
    }

    private loop(datas: TreeTypeUiEntity[]): React.ReactNode {

        return datas.map((model) => {
            if (model.children && model.children.length) {
                if (model.IsCategory === "1") {
                    return (
                        <TreeSelect.TreeNode
                            key={model.key} value={model.value} title={model.title} disabled={this.props.TreeTypeStore!.disabled} >
                            {this.loop(model.children)}
                        </TreeSelect.TreeNode>
                    );
                } else {
                    return (
                        <TreeSelect.TreeNode key={model.key} value={model.value} title={model.title} >
                            {this.loop(model.children)}
                        </TreeSelect.TreeNode>
                    );
                }
            } else {
                return <TreeSelect.TreeNode key={model.key} value={model.value} title={model.title} />;
            }
        })

    }
    /**
     * 下拉框样式
     */
    private handleOnDropDowmStyle = (value: any): any => {
        return { maxHeight: value.length > 6 ? "240px" : "200px", maxWidth: "300px" };
    }
}