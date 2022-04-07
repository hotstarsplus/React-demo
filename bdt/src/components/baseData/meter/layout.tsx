import { Card, Tabs } from 'antd';
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { MainBranchTypeView } from './mainBranchType/listView/ui';
import { ManufacturerView } from './manufacturer/ui';
import { MeterCaliberView } from './meterCaliber/ui';
import { MeterModelView } from './meterModel/ui';
import { MeterStateView } from './meterState/ui';
import { QuantityTapyView } from './quantityTapy/ui'
import { SpecialProgressTypeView } from './specialProcessType/ui';
import stores from './stores';


@observer
export class MeterLayout extends React.Component {
    public render() {
        console.log('render MeterCaliberLayout');
        return (
            <div>
                <Provider {...stores}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1" >
                            <Tabs.TabPane tab="水表口径" key="1">
                                <MeterCaliberView />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="水表类型" key = "2">
                                <MeterModelView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="水量类型" key = "3">
                                <QuantityTapyView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="水表状态管理" key = "4">
                                <MeterStateView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="水表厂商" key = "5">
                                <ManufacturerView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="总分表类型" key = "6">
                                <MainBranchTypeView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="特殊处理类型" key = "7">
                                <SpecialProgressTypeView/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Provider >
            </div>
        );
    }
}

