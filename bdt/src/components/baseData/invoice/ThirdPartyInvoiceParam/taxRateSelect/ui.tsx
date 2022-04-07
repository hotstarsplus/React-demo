import { Select } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITaxRateSelectProps } from "./interface";






@inject("GlobalThirdPartyInvoiceParamDomainStore")
@observer
export class TaxRateSelect extends React.Component<ITaxRateSelectProps>{


    constructor(props:ITaxRateSelectProps){
        super(props)
    }


    public render(){
        const data = this.props.GlobalThirdPartyInvoiceParamDomainStore!.TaxRateList;
        return(
            <Select
                onChange = {this.props.onChange}
                value = {this.props.value}
            >
                {
                    data.map((model)=>{
                        return(
                            <Select.Option
                             key = {model.TaxRate}
                             value = {model.TaxRate}
                            >
                                {
                                    model.TaxRate
                                }
                            </Select.Option>
                        )
                    })
                }
            </Select>
        )
    }

}