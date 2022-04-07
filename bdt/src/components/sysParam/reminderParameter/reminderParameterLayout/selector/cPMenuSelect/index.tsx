import { Select } from 'antd';
import { inject ,observer, } from 'mobx-react';
import * as React from 'react';
import { ICPMenuSelectProps } from './interface';
@inject("reminderParameterStore")
@observer
export class CPMenuSelect extends React.Component<ICPMenuSelectProps>{
    constructor(props:ICPMenuSelectProps){
        super(props)
    }
    public render(){
        const data =this.props.reminderParameterStore!.CpMenuList
        return(
        <Select
            onChange={this.props.onChange}
            value={this.props.value}
        >
            {
                data.map(
                    (model)=>{
                        return(
                            <Select.Option
                                key={model.BusinessID}
                                value={model.BusinessID}
                                >
                                {
                                    model.BusinessName    
                                }
                                </Select.Option>
                        )
                    }
                )
            }
            </Select>
        );
    }
}