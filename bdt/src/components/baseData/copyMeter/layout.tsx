import { Card, Tabs } from 'antd';
import * as React from 'react';


export class CopyMeterLayOut extends React.Component{
    public render(){
        console.log("render CopyMeterLayOut")
        return(
            <div>
                <Card bordered={false}>
                    <Tabs defaultActiveKey = "1">
                        <Tabs.TabPane tab="抄见状态" key = "1">
                            {/* <CopyStateView/> */}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab = "抄表类型" key = "2">
                            {/* <CopyTypeView/> */}
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}