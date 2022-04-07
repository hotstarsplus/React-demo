import Select, { SelectValue } from "antd/lib/select";
import React from "react";

export interface IMakeOutInvoiceTypeSelector {
    /**
     * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
     */
    onChange?: (value: SelectValue, option?: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    /**
     * 当前选择项
     */
    value?: SelectValue;

}

export class MakeOutInvoiceTypeSelector extends React.Component<IMakeOutInvoiceTypeSelector>{

    constructor(props: IMakeOutInvoiceTypeSelector) {
        super(props);

    }


    public render() {
        return (
            <Select
                onChange={this.props.onChange}
                labelInValue={false}
                placeholder="请选择开票方式"
                value={this.props.value}
                style={{ width: "100%" }}
            >
                
                <Select.Option key="0" value="0">不合并</Select.Option>
                <Select.Option key="1" value="1">用户合并</Select.Option>
                <Select.Option key="2" value="2">用户同一年月合并</Select.Option>
                <Select.Option key="3" value="3">客户合并</Select.Option>
                <Select.Option key="4" value="4">客户同一年月合并</Select.Option>
            </Select>
        )
    }
}