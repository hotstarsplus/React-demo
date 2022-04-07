import { Select } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ISourceSelectViewProps } from "./interface";


interface ISourceSelectViewState{
    optionType?:string,
}

@inject("InvoicingParametersdoMainStore")
@observer
export class SourceSelectView extends React.Component<ISourceSelectViewProps,ISourceSelectViewState>{


    constructor(props:ISourceSelectViewProps){
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
                ref={e=> this.props.rebindRef && this.props.rebindRef(e)}
                defaultValue={this.props.value}
            >
                {
                    this.props.InvoicingParametersdoMainStore!.SourceList.map((model)=>{
                        return (<Select.Option key={model.FieldId} value={model.FieldId} >{model.FieldCnName}</Select.Option>)
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
    }


}