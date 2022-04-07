import { Card } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { CopyTypeTableView } from '../typeTable/ui';

/**
 * 抄表类型视图
 */
@observer
export class CopyTypeView extends React.Component{


    public render(){
        console.info('render CopyTypeView');
        return (
            <Card bordered={false} className={'card'}>
                <div className={'tableList'}>
                    <CopyTypeTableView/>
                </div>
            </Card>
        );
    }

}