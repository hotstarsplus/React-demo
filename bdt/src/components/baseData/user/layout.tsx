import { Card, Tabs } from 'antd';
import { observer,Provider,  } from 'mobx-react';
import * as React from 'react';
import { CardTypeView } from './cardType/ui';
import { CardTypeCopyDateView } from './cardTypeCopyDate/listView/ui';
import { CardTypeLateFeeView } from './cardTypeLateFee/listView/ui';
import { CustomerTableView } from './customerState/customerStateTable/ui';
import { CustomerTypeView } from './customerType/listView/ui';
import  stores  from './stores';

@observer
export class UserLayOut extends React.Component{

    public render(){
        return (
            <div>
                <Provider {...stores}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1" >
                            <Tabs.TabPane tab="水卡型号" key="1">
                                <CardTypeView />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="用户状态" key = "2">
                                <CustomerTableView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="用户类型违约金" key = "3">
                                <CardTypeLateFeeView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="水卡类型抄表时间关系" key="4">
                                <CardTypeCopyDateView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="用户自定义类型" key="5">
                                <CustomerTypeView/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="水卡类型" key="6">
                                <CardTypeView/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Provider >
            </div>
        );
    }
}