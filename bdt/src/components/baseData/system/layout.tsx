import { Card, Tabs } from 'antd';
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { PayBankView } from './payBank/ui';
import { PayTypeView } from './payType/ui';
import stores from './stores';

@observer
export class SystemLayout extends React.Component {
    public render() {
        console.log('render SystemLayout');
        return (
            <div>
                <Provider {...stores}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1" >
                            <Tabs.TabPane tab="银行表" key="1">
                                <PayBankView />
                            </Tabs.TabPane>
                        </Tabs>
                        <Tabs defaultActiveKey="2" >
                            <Tabs.TabPane tab="银行表" key="1">
                                <PayTypeView />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Provider >
            </div>
        );
    }
}

