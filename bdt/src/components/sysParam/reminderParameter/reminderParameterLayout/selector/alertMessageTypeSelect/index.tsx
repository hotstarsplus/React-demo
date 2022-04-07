import { Select } from 'antd';
import { inject ,observer, } from 'mobx-react';
import * as React from 'react';
import { IAlertMessageTypeSelectProps } from './interface';
@inject("reminderParameterStore")
@observer
export class AlertMessageTypeSelect extends React.Component<IAlertMessageTypeSelectProps>{
    constructor(props:IAlertMessageTypeSelectProps){
        super(props)
    }
    public render(){
        const data =this.props.reminderParameterStore!.alertMessageTypeList
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
                                key={model.MessageTypeId}
                                value={model.MessageTypeId}
                                >
                                {
                                    model.MessageTypeValue    
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