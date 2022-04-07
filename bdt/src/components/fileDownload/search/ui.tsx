import { Button, DatePicker, Select, Tooltip } from "antd";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { SelectValue } from 'antd/lib/select';
import { action } from "mobx";
import moment from "moment";
import { ProxyToolTip } from "orid";
import React from "react";
import { DownLoadFilesSearchAction } from "./uiAction";

class DownLoadFilesSearch extends React.Component<{
    search: (obj: object)=> void;
    shortList: Array<{}>,
    payList: Array<{}>
}, {
    module?: string,
    createTime?: RangePickerValue
    operaId?: string
}>{ 

    private uiAction: DownLoadFilesSearchAction;

    public constructor(props: any) {
        super(props);

        this.state = {
            module: undefined,
            createTime: [moment(new Date()), moment(new Date())],
            operaId: undefined
        }

        this.uiAction = new DownLoadFilesSearchAction(props);
    }

    public componentWillReceiveProps() {
        this.setState({});
    };
    
    public render() {
        return (
            <React.Fragment>    
                <Tooltip title="模块名称">
                    <Select  
                        style={{ width: "180px", marginRight: "8px" }}
                        value={this.state.module}
                        allowClear={true}
                        onChange={this.changeModel}
                        placeholder={"模块名称"}
                    >
                        {
                            this.props.shortList.map(( model )=> {
                                if ( model ) {
                                    return <Select.Option key={model["AutoId"]} value={model["MenuId"]}>{model["MenuName"]}</Select.Option>
                                }
                                return "";
                            })
                        }
                    </Select>
                </Tooltip>
                <Tooltip title="模块名称">
                    <Select 
                        placeholder={"操作人"}
                        style={{ width: "180px", marginRight: "8px" }}
                        allowClear={true}
                        value={this.state.operaId}
                        onChange={this.changeOperaId}
                        >
                    {this.props.payList.map(item => (
                            <Select.Option key={item["OperatorId"]} value={item["OperatorId"]}>{item["OperatorName"]}</Select.Option>
                        ))}
                    </Select>
                </Tooltip>

                <ProxyToolTip style={{ }} title="生成时间">
                    <DatePicker.RangePicker 
                        style={{ marginRight: "8px" }}
                        format={"YYYY-MM-DD"}
                        value={this.state.createTime}
                        onChange={this.changetime}
                    />
                </ProxyToolTip>

                <Button 
                    onClick={()=> {
                        this.uiAction.onSearch({
                            module: this.state.module,
                            createTime: this.state.createTime,
                            operatorId: this.state.operaId,
                        })
                    }}
                >
                    查询
                </Button>
            </React.Fragment>
        )
    }

    @action.bound
    public changeModel(event: SelectValue) {
        this.setState({
            module: event? event+"": undefined
        }) 
    }   

    @action.bound
    public changeOperaId(event: SelectValue) {
        this.setState({
            operaId: event? event+"": undefined
        }) 
    }   

    @action.bound
    public changetime(t: RangePickerValue, event: [string, string]) {
        this.setState({
            createTime: t
        }) 
    }
}


export { DownLoadFilesSearch };

