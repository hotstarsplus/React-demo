import { Spin } from "antd";
import { inject, observer } from "mobx-react";
import { Nodata } from "orid";
import React from "react";
import { BillTemplateLayoutStore } from "../layout/store";
import { BillTemplateCardStore } from "./store";
import "./ui.scss";
import { BillTemplateCardUiAction } from "./uiAction";



export interface IBillTemplateCardProps {
    /**
     * 票据模板块Store
     */
    BillTemplateCardUiStore?: BillTemplateCardStore
    /**
     * 票据模板layoutStore
     */
    BillTemplateLayoutStore?: BillTemplateLayoutStore
}
@inject("BillTemplateCardUiStore", 'BillTemplateLayoutStore')
@observer
export class BillTemplateCard extends React.Component<IBillTemplateCardProps>{

    public uiAction: BillTemplateCardUiAction;

    public constructor(props: IBillTemplateCardProps) {
        super(props);
        this.uiAction = new BillTemplateCardUiAction(props, this)
        this.props.BillTemplateCardUiStore!.Loading = true;
        Promise.all([
            this.props.BillTemplateLayoutStore!.LoadDataBillTemplate(),
            this.props.BillTemplateLayoutStore!.LoadKindData(),
            this.props.BillTemplateLayoutStore!.loadReferencesData(),
            this.props.BillTemplateLayoutStore!.GetListAll(),
            this.props.BillTemplateLayoutStore!.GetBankListAll(),
        ]).then((res) => this.setState({}, () => this.props.BillTemplateCardUiStore!.Loading = false));
    }

    public render() {
        const cardStore = this.props.BillTemplateCardUiStore!;
        return (
            <div className="bdt-cascader">
                <Spin tip="正在加载中..." spinning={cardStore.Loading} style={{ paddingTop: 120, verticalAlign: "middle" }}>
                    {
                        (() => {
                            const kind = this.uiAction.renderBill(); // 票据模板
                            const bank = this.uiAction.renderBank(); // 银行模板
                            const pre = this.uiAction.CreateCard(); // 预收款

                            const dom = <>
                                {kind}
                                {pre}
                                {bank}
                            </>

                            if ((!!pre||!!bank!['join']('') || !!kind!['join'](''))) {
                                return dom;
                            }

                            return <div style={{ paddingTop: "64px", textAlign: "center" }}><Nodata /></div>

                        })()
                    }
                </Spin >
            </div>
        )
    }





}