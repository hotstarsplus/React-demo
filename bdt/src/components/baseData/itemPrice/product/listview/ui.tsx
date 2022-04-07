import { message } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo, OridStores, VerThr } from "orid";
import * as React from "react";
// import { WaterKindTree } from "../../waterKind";
import { BusinessAndProductKindTreeList } from "../../../system/businessType/businessAndProductKindTree";
import { WaterProductDialogView } from "../dialog/ui";
import { WaterProductTable } from "../table/ui";
import { IWaterProductListViewProps } from "./interface";
import { WaterProductListViewUiAction } from "./uiAction";


/** 产品 */
@inject("GlobalWaterProductStore", "ProductKindUiStore", "GlobalBusinesstypeStore", "GlobalCalcFeeTypeStore")
@observer
export class WaterProductView extends React.Component<IWaterProductListViewProps>{

    private uiAction: WaterProductListViewUiAction;

    constructor(props: IWaterProductListViewProps) {

        super(props);

        this.uiAction = new WaterProductListViewUiAction(props);

    }
    public componentWillMount() {
        message.destroy()
    }
    public componentDidMount() {
        this.uiAction.InitTable();
        this.props.GlobalWaterProductStore!.CompanyCode = OridStores.authStore.currentOperator.CpCode
        this.props.GlobalWaterProductStore!.loadBillTypeMenu();
    }

    public render() {
        return (
            <HorTwo style={{ padding: "16px" }} >
                <HorTwo.left style={{ padding: "0px 8px 16px 8px", borderRight: "1px solid #ccc" }}>
                    {/* <WaterKindTree onSelect={this.uiAction.OnTreeSelect} /> */}
                    <BusinessAndProductKindTreeList
                        onSelect={this.uiAction.OnTreeSelect}
                        selectKeys={this.uiAction.selectKeys}
                    />
                </HorTwo.left>
                <HorTwo.right>
                    <VerThr >
                        <VerThr.middle className="ori-drawer-father" style={{ padding: '0px 16px 0px 16px' }}>
                            <WaterProductTable
                                onEdit={this.uiAction.Edit}
                                onChecked={this.uiAction.OnTableRowSelect}
                                onCancelChecked={this.uiAction.OnTableCancelChecked}
                            />
                        </VerThr.middle>
                    </VerThr>
                    <WaterProductDialogView
                        visiable={this.uiAction.IsVisiableModal}
                        handleCancel={this.uiAction.Cancel}
                        handleOk={this.uiAction.saveClick}
                        businessTypeId={this.uiAction.businessTypeId}
                        title={this.uiAction.modaltitle}
                    />
                </HorTwo.right>
            </HorTwo>
        );

    }



}