import { Select } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IBillTypeMenuSelectProps } from "./interface";

@inject("GlobalWaterProductStore")
@observer
export class BillTypeMenuSelect extends React.Component<IBillTypeMenuSelectProps>{
    constructor(props:IBillTypeMenuSelectProps){
        super(props);
    }
    public render(){
        const data = this.props.GlobalWaterProductStore!.BillTypeMenuList
        return(
            <>
                <Select
                    onChange={this.props.onChange}
                    value={this.props.value}
                >
                    {
                        data.map((model)=>{
                            return(
                                <Select.Option
                                    key={model.BillTypeId}
                                    value={model.BillTypeId}
                                    >
                                    {
                                        model.BillTypeName
                                    }
                                </Select.Option>
                            )
                        })
                    }

                </Select>
            </>
        );
    }
}