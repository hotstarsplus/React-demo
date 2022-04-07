import { Button, Card } from 'antd';
import {inject, observer } from 'mobx-react';
import * as React from 'react';
import '../../index.scss';
import { WaterRateItemTypeItemDialog } from '../itemDialog/ui';
import { WaterRateItemTypeTableView } from '../itemTable/ui';
import {IWaterRateItemTypeView} from './interface';
import { WaterRateItemTypeViewUiAction } from './uiAction'




/**
 * 水费项目类型列表视图 
 * 
 */
@inject('GlobalWaterRateItemTypeStore')
@observer
export class WaterRateItemTypeView extends React.Component<IWaterRateItemTypeView> {
    private uiAction: WaterRateItemTypeViewUiAction;

    constructor(props: any) {
        super(props);
        this.uiAction = new WaterRateItemTypeViewUiAction(this.props.GlobalWaterRateItemTypeStore!);
    }

    public render() {
        console.log("render WaterRateItemTypeView");
        return (
            <Card bordered={false} className={'card'} >
                <div className={'tableList'}>
                    <div className={'tableListOperator'}>
                        <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                            新建
                        </Button>
                    </div>
                    <WaterRateItemTypeTableView 
                        onEdit={this.uiAction.onEditClick}
                    />
                </div>

                <WaterRateItemTypeItemDialog
                    handleCancel={this.uiAction.cancelAddOrEdit}
                    handleOk={this.uiAction.saveClick}
                    visible={this.uiAction.isVisiableModal}
                    title={this.uiAction.modaltitle}
                />
            </Card>
        );
    }
}
