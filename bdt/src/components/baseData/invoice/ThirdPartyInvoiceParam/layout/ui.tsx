import { Button } from "antd";
import { inject, observer } from "mobx-react";
import { HorTwo, VerThr } from "orid";
import * as React from "react";
import { ProductItemTreeList } from "../../../itemPrice/productItem";
import { ThirdPartyInvoiceParamModal } from "../modal/ui";
import { ThirdPartyInvoiceParamTable } from "../table/ui";
import { IThirdPartyInvoiceParamLayoutProps } from "./interface";
import { ThirdPartyInvoiceParamLayoutUiAction } from "./uiAction";






@inject("GlobalThirdPartyInvoiceParamDomainStore")
@observer
export class ThirdPartyInvoiceParamLayout extends React.Component<IThirdPartyInvoiceParamLayoutProps>{

    private uiAction: ThirdPartyInvoiceParamLayoutUiAction;

    constructor(props: IThirdPartyInvoiceParamLayoutProps) {
        super(props);
        this.uiAction = new ThirdPartyInvoiceParamLayoutUiAction(props);
    }



    public render() {
        return (
            <HorTwo style={{ padding: "16px", background: "#fff" }}>
                <HorTwo.left style={{ paddingRight: "8px ", borderRight: "1px solid #d9d9d9" }} width="220px">
                    <ProductItemTreeList
                        onSelect={this.uiAction.ProductItemOnSelect}
                    />
                </HorTwo.left>
                <HorTwo.right style={{ paddingLeft: "8px" }}>
                    <VerThr >
                        <VerThr.top style={{ padding: "0px 8px 16px 0px" }}  >
                            <Button
                                icon="plus"
                                type="primary"
                                onClick={this.uiAction.openAddModal}
                            >
                                添加
                            </Button>
                            <ThirdPartyInvoiceParamModal
                                title={this.uiAction.showTitle}
                                visible={this.uiAction.ShowModal}
                                onOk={this.uiAction.Save}
                                onCancel={this.uiAction.CancelModal}
                                operationType={this.uiAction.OperationType}
                            />
                        </VerThr.top>
                        <VerThr.middle>
                            <ThirdPartyInvoiceParamTable
                                onEdit={this.uiAction.Edit}
                            />
                        </VerThr.middle>
                    </VerThr>
                </HorTwo.right>
            </HorTwo>
        )
    }


}