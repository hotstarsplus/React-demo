import { Button, message, Radio, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { SysParamDoMainStore } from '../domainStore';

interface IWaterMeterFlowParamProps {
    sysParamStore?: SysParamDoMainStore;
}

@inject('sysParamStore')
@observer
export class WaterMeterFlowParam extends React.Component<IWaterMeterFlowParamProps> {
    public state = {
        value: 1,
    };
    public componentWillMount() {
        message.destroy()
    }
    public componentDidMount() {
        this.props.sysParamStore!.GetWaterMeterFlowParam();
    }

    public onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        this.props.sysParamStore!.flowNo = e.target.value;

    };

    public render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            this.props.sysParamStore!.flowNo !== "" ?
                <div >
                    <div> <Button onClick={this.save} style={{marginBottom:'16px'}} >保存</Button></div>
                    <Radio.Group onChange={this.onChange} defaultValue={this.props.sysParamStore!.flowNo}>
                        <Radio style={radioStyle} key="01" value="01">
                            采购单-{'>'}首检单-{'>'}入库单
                    </Radio>
                        <Radio style={radioStyle} key="02" value="02">
                            采购单-{'>'}入库单-首检出库-{'>'}首检-{'>'}入库
                    </Radio>
                    </Radio.Group>
                </div> : <Spin />
        );
    }
    public save = () => {
        if (String(this.props.sysParamStore!.FlowNo) === String(this.props.sysParamStore!.flowNo)) {
            message.info('暂无需要保存的数据')
            return
        }
        this.props.sysParamStore!.FlowNo = this.props.sysParamStore!.flowNo
        this.props.sysParamStore!.SaveWaterMeterFlowParam(String(this.props.sysParamStore!.flowNo));
    }
}