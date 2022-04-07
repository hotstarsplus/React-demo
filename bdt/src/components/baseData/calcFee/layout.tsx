import { Card, Tabs } from 'antd';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { CalcFeeStateView } from './calcFeeState/listView/ui';
import { CalcFeeTypeView } from './calcFeeType/ui';
import calcFeeStores from './stores';


/**
 * 计费layout
 */
@observer
export class CalcFeeLayOut extends React.Component{
    public render()
    {
        console.info('render ChargeLayOut');
        return(
            <div>
                <Provider {...calcFeeStores}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="计费方式" key="1">
                                <CalcFeeTypeView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="计费状态" key="2">
                                <CalcFeeStateView/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Provider>
            </div>
        );
    }
}