import { Button, Checkbox, Col, message, Spin } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { inject, observer } from "mobx-react";
import { FlexAlign } from "orid";
import React from "react";
import { SysParamDoMainStore } from "../domainStore";

export interface IBaseParamProps {
    sysParamStore?: SysParamDoMainStore;
}

@inject('sysParamStore')
@observer
export class BaseParamVlew extends React.Component<IBaseParamProps> {

    constructor(props: IBaseParamProps) {
        super(props);
        this.save = this.save.bind(this);
        this.OnReginUseCheckboxChangeHandle = this.OnReginUseCheckboxChangeHandle.bind(this);
    }

    public componentDidMount() {
        this.props.sysParamStore!.GetBaseParam();
    }


    public render() {
        console.log("BaseParamVlew_render_IsUseReginSecurrty", this.props.sysParamStore!.BaseParam.IsUseReginSecurrty, !this.props.sysParamStore!.BaseParam.IsUseReginSecurrty)
        return (
            this.props.sysParamStore!.BaseParam.IsUseReginSecurrty ?
                <div>
                    <div> <Button onClick={this.save} style={{marginBottom:'16px'}}>保存</Button></div>
                    <div>
                        <FlexAlign className={"row-FlexAlign"}>
                            <div className={"text-col"} style={{ width: '130px', textAlign: 'right', marginRight: '10px' }}>
                                是否启用区段权限：
                                </div>
                            <div className={"Component-col"}>
                                <Col span={6}>
                                    <Checkbox checked={this.props.sysParamStore!.BaseParam.IsUseReginSecurrty !== "0"} onChange={this.OnReginUseCheckboxChangeHandle}>
                                        是
                                        </Checkbox>
                                </Col>
                            </div>

                        </FlexAlign>
                    </div>
                </div> : <Spin />
        );
    }

    private OnReginUseCheckboxChangeHandle(e: CheckboxChangeEvent) {
        console.log("OnReginUseCheckboxChangeHandle")
        const IsUseReginSecurrty = this.props.sysParamStore!.BaseParam.IsUseReginSecurrty === "0" ? "1" : "0"; // 触发控件渲染
        this.props.sysParamStore!.BaseParam.IsUseReginSecurrty = IsUseReginSecurrty;
    }

    private save() {
        console.log("save_baseparam:", this.props.sysParamStore!.BaseParam)
        const store = this.props.sysParamStore;
        if (store!.IsUseReginSecurrty === store!.BaseParam.IsUseReginSecurrty) {
            message.info('暂无需要保存的数据')
            return
        }
        store!.SaveBaseParam(store!.BaseParam)
    }
}