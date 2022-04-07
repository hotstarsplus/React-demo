import { Input, Select } from 'antd';
import * as React from 'react';

interface IEditComponentInputProps{
    getRef:(node:any)=>void
    onPressEnter:(event:any)=>void
    onBlur:(event:any)=>void
}

export class EditComponentInput extends React.Component<IEditComponentInputProps>{
    public render(){
        return(
            <>
            <Input
                ref={this.props.getRef} 
                onPressEnter={this.props.onPressEnter} 
                onBlur={this.props.onBlur}
                style={{width:"100%"}} 
                />
            </>
        );
    }
}

export class EditComponentSelect extends React.Component<IEditComponentInputProps>{
    public render(){
        return(
            <>
            <Select
                ref={this.props.getRef} 
                onChange={this.props.onBlur}
                style={{width:"100%",height:"100%"}} placeholder={"请选择阶梯上限"}
            >
                <Select.Option key={1} value={"first"}>一阶水量</Select.Option>
                <Select.Option key={2} value={"second"}>二阶水量</Select.Option>
                <Select.Option key={3} value={"third"}>三阶水量</Select.Option>
            </Select>
            </>
        );
    }
}