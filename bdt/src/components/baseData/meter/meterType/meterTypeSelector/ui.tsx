import { TreeSelect } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
// import { MeterType } from "../entity";
import { IMeterTypeSelectorProps } from "./interface";
import { MeterTypeSelectUiAction } from "./uiAction";



/**
 * 下拉选视图
 */
@inject("GlobalMeterTypeStore")
@observer
export class MeterTypeSelect extends React.Component<IMeterTypeSelectorProps>{
    private uiAction: MeterTypeSelectUiAction;
    /**
     * 构造方法
     * @param props 参数
     */
    constructor(props: IMeterTypeSelectorProps) {
        super(props);
        // this.loop = this.loop.bind(this);
        this.uiAction = new MeterTypeSelectUiAction(props);
    }

    public render() {
        return (
            <TreeSelect
                onChange={this.handleOnChange}
                value={this.props.value || ""}
                treeData={this.props.list}
                labelInValue={false}
                disabled={this.props.disabled}
                placeholder={"请选择水表类型"}
                searchPlaceholder={"搜索"}
                allowClear={true}
                onSelect={this.uiAction.onSelect}
                dropdownStyle={this.handleOnDropDowmStyle(this.props.list)}
            />
        );
        {/*
                    this.loop(this.props.GlobalMeterTypeStore!.MeterTypeList)
                 */}
        {/* </TreeSelect>  */ }

    }
    /**
     * 选择框的值改变
     */
    private handleOnChange = (value: any, label: any) => {
        console.log("onChange:" + value)
        this.setState({
            value,
        });
        this.props.setFieldsValue!({
            FatherId: value === undefined ? "" : value
        })
    }

    // private loop(list:MeterType[]):JSX.Element[]{

    //     return  list.map((value)=>{
    //           if (value.children!==undefined&&value.children!==null) {
    //               return(
    //                   <TreeSelect.TreeNode  key={value.MeterTypeId} value={value.MeterTypeId} title={value.MeterTypeName} >
    //                      {
    //                          this.loop(value.children)
    //                      }
    //                     </TreeSelect.TreeNode>
    //                   )
    //           }else{
    //               return ( <TreeSelect.TreeNode value={value.MeterTypeId} title={value.MeterTypeName} key={value.MeterTypeId} />)
    //           }

    //       })

    //    }

    /**
     * 下拉框样式
     */
    private handleOnDropDowmStyle = (value: any): any => {
        return { maxHeight: value.length > 6 ? "240px" : "200px", maxWidth: "300px" };
    }
}