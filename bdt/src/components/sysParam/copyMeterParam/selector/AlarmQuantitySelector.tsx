import Select, { SelectValue } from "antd/lib/select";
import React from "react";

export interface IAlarmQauntitySelector {
    /**
     * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
     */
    onChange?: (value: SelectValue, option?: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    /**
     * 当前选择项
     */
    value?: SelectValue;

}

export class AlarmQauntitySelector extends React.Component<IAlarmQauntitySelector>{

    constructor(props: IAlarmQauntitySelector) {
        super(props);

    }


    public render() {
        return (
            <Select
                onChange={this.props.onChange}
                labelInValue={false}
                placeholder="请选择报警参考水量"
                value={this.props.value}
                style={{ width: "100%" }}
            >
                
                <Select.Option key="1" value="1">上月水量</Select.Option>
                <Select.Option key="2" value="2">前三个月平均水量</Select.Option>
                <Select.Option key="3" value="3">前六个月平均水量</Select.Option>
                <Select.Option key="4" value="4">去年同期水量</Select.Option>

            </Select>
        )
    }
}