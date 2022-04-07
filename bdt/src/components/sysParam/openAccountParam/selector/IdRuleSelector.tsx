import Select, { SelectValue } from 'antd/lib/select';
import * as React from 'react';
import { IdRuleEntity } from '../../entity/IdRuleEntity';

export interface IIdRuleSelectorProps {
    list:IdRuleEntity[]
    /**
     * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
     */
    onChange?: (value: SelectValue, option?: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    /**
     * 当前选择项
     */
    value?: SelectValue
}

export class IdRuleSelector extends React.Component<IIdRuleSelectorProps>{

    public render() {
        const { list,onChange,value } = this.props;

        return (
            <Select
                onChange={onChange}
                labelInValue={false}
                placeholder="请选择生成规则"
                value={value!}
                style={{width:"100%"}}
                // getPopupContainer={this.getPopupContainer}
            >
                {
                    list.map((item: IdRuleEntity) => {
                        return (
                            <Select.Option key={item.RuleId} value={item.RuleId} >
                                {item.RuleName}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        );
    }

    public getPopupContainer(triggerNode: Element):HTMLElement{
        return triggerNode.parentElement!;
    }
}