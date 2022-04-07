import { Card, Tabs } from 'antd';
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { BusinessOfficeView } from './businessOffice/ui';
import { RegionView } from "./region/ui";
import { ResidenceView } from './residence/ui';
import stores from './stores';

@observer
export class RegionLayout extends React.Component {
    public render() {
        console.log('render regionLayout');
        return (
            <div>
                <Provider {...stores}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1" >
                            <Tabs.TabPane tab="小区" key="1">
                                <ResidenceView />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="供水所" key="2">
                                <BusinessOfficeView />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="区段" key="3">
                                <RegionView />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Provider >
            </div>
        );
    }
}

