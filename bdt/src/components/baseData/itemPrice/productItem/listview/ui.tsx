import { Button, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { HorTwo, VerThr } from 'orid';
import * as React from 'react';
import { BusinessTypeTreeList } from '../../../system/businessType';
import '../../index.scss';
import { ProductItemDialog } from '../dialog/ui';
import { ProductItemTableView } from '../table/ui';
import { IProductItemViewProps } from './interface';
import { ProductItemViewUiAction } from './uiAction';

/**
 * 水费项目类型列表视图 
 * 
 */
@inject('GlobalProductItemStore', 'GlobalBusinesstypeStore')
@observer
export class ProductItemView extends React.Component<IProductItemViewProps> {
    private uiAction: ProductItemViewUiAction;

    constructor(props: any) {
        super(props);
        this.uiAction = new ProductItemViewUiAction(props);
    }
    public componentWillMount() {
        message.destroy()
    }

    public render() {
        return (

            <HorTwo style={{ padding: "16px" }}>
                <HorTwo.left style={{ padding: "0px 8px 16px 8px", borderRight: "1px solid #ccc" }}>
                    <BusinessTypeTreeList
                        onSelect={this.uiAction.TreeOnSelect}
                        selectedKeys={this.uiAction.selectKeys}
                    />
                </HorTwo.left>
                <HorTwo.right>
                    <VerThr>
                        <VerThr.top style={{ padding: '0px 16px 0px 16px' }}>
                            <Button
                                type={"primary"}
                                icon={"plus"}
                                onClick={this.uiAction.addClick}
                            >
                                {
                                    "新建"
                                }
                            </Button>
                        </VerThr.top>
                        <VerThr.middle className="wc-padding-trl-16 ori-drawer-father">
                            <ProductItemTableView
                                onDelete={this.uiAction.remove}
                                onEdit={this.uiAction.onEditClick}
                            />
                        </VerThr.middle>
                    </VerThr>
                    <ProductItemDialog
                        handleCancel={this.uiAction.cancelAddOrEdit}
                        handleOk={this.uiAction.saveClick}
                        visible={this.uiAction.isVisiableModal}
                        title={this.uiAction.modaltitle}
                    />
                </HorTwo.right>
            </HorTwo>
        );
    }
}
