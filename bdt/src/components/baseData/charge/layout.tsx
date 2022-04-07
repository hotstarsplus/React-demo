import { Card, Tabs } from 'antd';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { StateWriteOffView } from './stateWriteOff/listView/ui';
import stores from './stores';

/**
 * 计费layout
 */
@observer
export class ChargeLayOut extends React.Component{
    public render()
    {
        console.info('render ChargeLayOut');
        return(
            <div>
                <Provider {...stores}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="销账状态" key="1">
                                <StateWriteOffView/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Provider>
            </div>
        );
    }
}