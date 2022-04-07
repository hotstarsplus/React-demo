import Select from "antd/lib/select";
import * as React from "react";
import { MeterCaliber } from "../entity";
import { IMeterCaliberSelectorProps } from "./interface";

/**
 * 水表口径下拉选视图
 */
export class MeterCaliberSelectorView extends React.Component<IMeterCaliberSelectorProps>{
    public render() {
        const { GlobalMeterCaliberStore, onChange, value } = this.props;
        return (
            <Select
                onChange={onChange}
                value={value}
            >
                {
                    GlobalMeterCaliberStore!.list.map((item: MeterCaliber) => {
                        return (
                            <Select.Option key={item.MeterCaliberId} value={item.MeterCaliberName}>
                                {item.MeterCaliberName}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        );
    }
}