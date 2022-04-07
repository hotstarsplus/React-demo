import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { VerThr } from 'orid';
import * as React from 'react';
import '../../index.scss';
import { WaterFeeItemDialog } from '../itemDialog/ui';
import { WaterFeeItemTableView } from '../itemTable/ui';
import { IWaterFeeItemViewProps } from './interface';
import { WaterFeeItemViewUiAction } from './uiAction';

/**
 * 水费项目类型列表视图 
 * 
 */
@inject('GlobalWaterFeeItemStore')
@observer
export class WaterFeeItemView extends React.Component<IWaterFeeItemViewProps> {
    private uiAction: WaterFeeItemViewUiAction;

    constructor(props: any) {
        super(props);
        this.uiAction = new WaterFeeItemViewUiAction(this.props.GlobalWaterFeeItemStore!);
    }

    public render() {
        return (

            <VerThr style={{backgroundColor:"#fff",padding:"16px"}}>
                <VerThr.top style={{paddingBottom:"12px"}}>
                    <Button icon="plus" type="primary" onClick={this.uiAction.addClick}>
                                新建
                            </Button>
                </VerThr.top>
                <VerThr.middle>
                    <WaterFeeItemTableView 
                            onEdit={this.uiAction.onEditClick}
                        />
                </VerThr.middle>
                    <WaterFeeItemDialog
                        handleCancel={this.uiAction.cancelAddOrEdit}
                        handleOk={this.uiAction.saveClick}
                        visible={this.uiAction.isVisiableModal}
                        title={this.uiAction.modaltitle}
                    />
            </VerThr>
        );
    }
}
