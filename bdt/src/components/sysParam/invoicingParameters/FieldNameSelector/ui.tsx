import { Select } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IFieldNameSelectViewProps } from "./interface";


interface IFieldNameSelectViewState{
    optionType?:string,
}

@inject("InvoicingParametersdoMainStore")
@observer
export class FieldNameSelectView extends React.Component<IFieldNameSelectViewProps,IFieldNameSelectViewState>{


    constructor(props:IFieldNameSelectViewProps){
        super(props);
    }



    public render(){
        return(
            <div>
            <Select
                onChange={this.props.onChange}
                onSelect={this.onSelectChange}
                onBlur={this.props.onBlur!}
                style={{width:100}}
                defaultValue={this.props.value}
            >
                {
                   this.props.InvoicingParametersdoMainStore!.FieldNameList!.map((model)=>{
                        return (<Select.Option key={model.key} value={model.FieldName} >{model.FieldName}</Select.Option>)
                    })
                }
            </Select>
            </div>
        )
    }

    private onSelectChange = (value:any) =>{
        this.setState({
            optionType:value,
        })
        console.log({value});
    }


}