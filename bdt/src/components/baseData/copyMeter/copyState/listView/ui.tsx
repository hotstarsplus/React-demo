import {Card } from 'antd';
import {observer } from 'mobx-react';
import * as React from 'react';
import '../../../../index.scss';
import { CopyStateTableView } from '../itemTable/ui';

/**
 * 抄见状态列表视图 
 * 
 */
@observer
export class CopyStateView extends React.Component {


    public render() {
        console.info("render CopyStateView");
        return (
            <Card bordered={false} className={'card'} >
                <div className={'tableList'}>
                    <CopyStateTableView/>
                </div>

            </Card>
        );
    }
}
