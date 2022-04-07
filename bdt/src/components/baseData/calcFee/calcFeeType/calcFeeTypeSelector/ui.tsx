import { Select } from "antd";
import { inject, observer, } from "mobx-react";
import * as React from "react";
import { CalcFeeType } from "../entity";
import { ICalcFeeTypeSelectorProps } from "./interface";
import { CalcFeeTypeSelectorUiAction } from "./uiAction";

@inject("GlobalCalcFeeTypeStore")
@observer
export class CalcFeeTypeSelector extends React.Component<ICalcFeeTypeSelectorProps>{

    public uiAction: CalcFeeTypeSelectorUiAction;

    constructor(props: ICalcFeeTypeSelectorProps) {
        super(props);
        this.uiAction = new CalcFeeTypeSelectorUiAction(props);
    }

    public render() {
        const datas = this.props.GlobalCalcFeeTypeStore!.listByBusinessType;
        return (
            <Select
                onChange={this.props.onChange}
                value={this.props.value}
            >
                {datas.map((item: CalcFeeType) => {
                        return (
                            <Select.Option key={item.CalcFeeTypeId} value={item.CalcFeeTypeId} title={item.CalcFeeTypeName} >
                                {item.CalcFeeTypeName}
                            </Select.Option>
                        )
                    })}
            </Select>
        )
    }


}