import { Select } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITaxPreConSelectProps } from "./interface";




@inject("GlobalThirdPartyInvoiceParamDomainStore")
@observer
export class TaxPreConSelect extends React.Component<ITaxPreConSelectProps>{


    constructor(props:ITaxPreConSelectProps){
        super(props);
    }


    public render(){
        const data = this.props.GlobalThirdPartyInvoiceParamDomainStore!.TaxPreConList;
        return(
            <Select
                onChange = {this.props.onChange}
                value = {this.props.value}
            >
            {
                data.map((model)=>{
                    return(
                        <Select.Option
                            key = {model.TaxPreCon}
                            value = {model.TaxPreCon}
                        >
                            {
                                model.TaxPreCon.trim().length===0?"空":model.TaxPreCon
                            }
                        </Select.Option>
                    )
                })
            }
            </Select>
        )
    }

}