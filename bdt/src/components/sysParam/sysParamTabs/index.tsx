import { message, Spin, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BaseParamVlew } from '../BaseParam';
import { CalcFeeParam } from '../calcFeeParam/ui';
import { ChargeWriteOffParam } from '../chargeWriteOffParam';
import { CopyMeterParamLayout } from '../copyMeterParam/copyMeterParamLayout';
import { InvoicingParametersLayout } from '../invoicingParameters/invoicingParametersLayout';
import { LateFeeParam } from '../lateFeeParam-old';
import { OpenAccountParamLayout } from '../openAccountParam/openAccountParamLayout';
import { ReminderParameterLayout } from '../reminderParameter/reminderParameterLayout';
import { WaterMeterFlowParam } from '../waterMeterFlowParam';
import { ISysParamTabsProps } from './interface';

@inject('sysParamStore')
@observer
export class SysParamTabs extends React.Component<ISysParamTabsProps>{
    constructor(props: ISysParamTabsProps) {
        super(props)
    }
    public componentWillMount() {
        message.destroy()
    }

    public componentDidMount() {
        this.props.sysParamStore!.getMenuBtnPower();
        this.props.sysParamStore!.GetAllSysParam();
    }

    public render() {
        console.log(this.props.sysParamStore!.menuBtnList.includes('10001610'))
        return (
            <>
                <Tabs>
                    {this.props.sysParamStore!.menuBtnList.includes('10001610') ?
                        <Tabs.TabPane tab="基本参数" key={1+ ""}>
                            <BaseParamVlew />
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001620') ?
                        <Tabs.TabPane tab="开户参数" key={2+ ""}>
                            <Spin spinning={this.props.sysParamStore!.isLoading} tip={"正在加载..."}>
                                <OpenAccountParamLayout />
                            </Spin>
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001630') ?
                        <Tabs.TabPane tab="水表流程参数" key={8+ ""}>
                            <Spin spinning={this.props.sysParamStore!.isLoading} tip={"正在加载..."}>
                                <WaterMeterFlowParam />
                            </Spin>
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001640') ?
                        <Tabs.TabPane tab="抄表参数" key={7+ ""}>
                            <CopyMeterParamLayout />
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001650') ?
                        <Tabs.TabPane tab="审核计费参数" key={3+ ""}>
                            <CalcFeeParam />
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001660') ?
                        <Tabs.TabPane tab="收费销账参数" key={10+ ""}>
                            <ChargeWriteOffParam />
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001670') ?
                        <Tabs.TabPane tab="违约金参数" key={4+ ""}>
                            <LateFeeParam />
                            {/* <Spin spinning={this.props.sysParamStore!.isLoading} tip={"正在加载..."}>
                           <LateFeeParam />
                       </Spin> */}
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001680') ?
                        <Tabs.TabPane tab="开票参数" key={6+ ""}>
                            <InvoicingParametersLayout />
                        </Tabs.TabPane> : ''
                    }
                    {this.props.sysParamStore!.menuBtnList.includes('10001690') ?
                        <Tabs.TabPane tab="提醒参数" key={9+ ""}>
                            <ReminderParameterLayout />
                        </Tabs.TabPane> : ''
                    }

                    {/* <Tabs.TabPane tab="报表参数" key={5+ ""}>
                            <div/>
                        </Tabs.TabPane> */}
                </Tabs>
            </>
        );
    }

}