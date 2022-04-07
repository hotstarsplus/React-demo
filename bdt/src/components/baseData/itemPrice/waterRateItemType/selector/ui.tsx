import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select'
import {  inject,observer,  } from 'mobx-react';
import * as React from 'react';
import { WaterRateItemTypeDomainStore } from '../doMainStore';
import { WaterRateItemType } from '../entity';


export interface IWaterRateItemTypeSelecterProps {
    /**
     * 数据源
     */
    GlobalWaterRateItemTypeStore?: WaterRateItemTypeDomainStore,
    /**
     * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
     */
    onChange?: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    /**
     * 当前选择项
     */
    value?: SelectValue
}

@inject('GlobalWaterRateItemTypeStore')
@observer
export class WaterRateItemTypeSelecter extends React.Component<IWaterRateItemTypeSelecterProps> {
    public render() {
        const { GlobalWaterRateItemTypeStore,onChange, value } = this.props;

        return (
            <Select
                onChange={onChange}
                value={value || ''}
            >
                {
                    GlobalWaterRateItemTypeStore!.list.map((item: WaterRateItemType) => {
                        return (
                            <Select.Option key={item.ItemTypeId} value={item.ItemTypeName} >
                                {item.ItemTypeName}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        );
    }
}