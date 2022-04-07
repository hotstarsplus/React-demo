import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { Residence } from "../entity";
import { IResidenceSelectorProps } from "./interface";


/**
 * 下拉选视图
 */
@inject("GlobalResidenceStore")
@observer
export class ResidenceSelectView extends React.Component<IResidenceSelectorProps>{


    constructor(props: IResidenceSelectorProps) {
        super(props);
        this.loop = this.loop.bind(this);
    }

    public render() {
        console.log("ResidenceSelectView====", this.props.value)
        return (
            <TreeSelect
                showSearch={true}
                onChange={this.props.onChange}
                value={this.props.value}
                disabled={this.props.GlobalResidenceStore!.SelectorDisabled}
                treeDefaultExpandAll={false}
                labelInValue={false}
                placeholder={this.props.GlobalResidenceStore!.isEditModal ? "" : "请选择小区"}
                dropdownStyle={{ maxHeight: "200px", maxWidth: '300px' }}
                allowClear={true}
            >
                {
                    this.loop(this.props.GlobalResidenceStore!.ResidenceList)
                }
            </TreeSelect>

        );
    }


    private loop(list: Residence[]): JSX.Element[] {
        console.log("list====",list)
        return list.map((value) => {
            if (value.children !== undefined && value.children !== null) {
                return (
                    <TreeSelect.TreeNode key={value.GardenId} value={value.GardenId} title={value.GardenName} >
                        {
                            this.loop(value.children)
                        }
                    </TreeSelect.TreeNode>
                )
            } else {
                return (<TreeSelect.TreeNode value={value.GardenId} title={value.GardenName} key={value.GardenId} />)
            }

        })

    }

}