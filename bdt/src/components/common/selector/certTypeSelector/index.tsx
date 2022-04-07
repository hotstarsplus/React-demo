import Select, { SelectValue } from 'antd/lib/select';
import * as React from 'react';
import { LadderInfo } from '../../entity/bdt/ladderInfo';

export interface ILadderInfoSelectorProps {
    list: LadderInfo[]
    /**
     * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
     */
    onChange?: (value: SelectValue, option?: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    /**
     * 当前选择项
     */
    value?: SelectValue
    placeholder: string;
    disabled?: boolean;
    className?:string
    defaultValue?:any;
}

export class LadderInfoSelector extends React.Component<ILadderInfoSelectorProps>{

    public render() {
        const { list, onChange, value, placeholder } = this.props;

        return (
            <Select
                className={this.props.className!}
                allowClear={true}
                onChange={onChange}
                defaultValue={this.props.defaultValue}
                labelInValue={false}
                placeholder={placeholder}
                value={value!}
                style={{ width: "100%" }}
                disabled={this.props.disabled}
            >
                {
                    list.map((item: LadderInfo) => {
                        return (
                            <Select.Option key={item.LadderLevel} value={item.LadderLevel} >
                                {item.LadderLevel}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        );
    }

}