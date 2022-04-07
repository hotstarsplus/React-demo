import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IBusinessOfficeTreeSelectProps, IBusinessOfficeTreeSelectState } from "../businessOfficeSelector/interface";
// import { BusinessOffice } from "../entity";
import { BusinessOfficeTreeSelectUiAction } from "./uiAction";


/**
 * 下拉组件
 */
@inject("GlobalBusinessOfficeStore")
@observer
export class BusinessOfficeTreeSelect extends React.Component<IBusinessOfficeTreeSelectProps, IBusinessOfficeTreeSelectState>{
    private uiAction: BusinessOfficeTreeSelectUiAction
    /**
     * 构造方法
     */
    constructor(props: IBusinessOfficeTreeSelectProps) {
        super(props);
        this.state = {
            value: ''
        }
        this.uiAction = new BusinessOfficeTreeSelectUiAction(props);
        this.loop = this.loop.bind(this)
    }

    public render() {
        return (
            <TreeSelect
                // 显示搜索框
                showSearch={true}
                onChange={this.handleOnChange}
                value={this.state.value === '' ? this.props.value.split("_")[1] : this.state.value || ""}
                // treeData={this.props.list}
                labelInValue={false}
                disabled={this.props.disabled}
                // 默认展开所有树节点
                treeDefaultExpandAll={false}
                searchPlaceholder={"搜索"}
                allowClear={true}
                placeholder={this.props.GlobalBusinessOfficeStore!.isEditModal ? "" : "请选择"}
                onSelect={this.uiAction.onSelect}
                dropdownStyle={{ maxHeight: "200px", maxWidth: '300px' }}>
                {this.loop(this.props.GlobalBusinessOfficeStore!.listDatas)}
            </TreeSelect>
        );
    }

    private loop(list: any[]): JSX.Element[] {

        return list.map((value) => {
            if (value.children !== undefined && value.children !== null) {
                return (
                    <TreeSelect.TreeNode key={value.BusinessOfficeId} value={value.BusinessOfficeId + '_' + value.BusinessOfficeName} title={value.BusinessOfficeName} >
                        {
                            this.loop(value.children)
                        }
                    </TreeSelect.TreeNode>
                )
            } else {
                return (<TreeSelect.TreeNode value={value.BusinessOfficeId + '_' + value.BusinessOfficeName} title={value.BusinessOfficeName} key={value.BusinessOfficeId} />)
            }

        })

    }
    /**
     * 选择框值的改变
     */
    private handleOnChange = (value: any, label: any) => {
        this.setState({
            value
        });
        this.props.setFieldsValue!({
            FatherId: value === undefined ? "" : value
        })
    }
}