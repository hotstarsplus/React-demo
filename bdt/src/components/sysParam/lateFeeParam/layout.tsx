import { Button, Col, Icon, Spin } from 'antd';
import { FlexAlign, HorTwo, VerThr } from 'orid';
import { VerMiddle } from 'orid/lib/layout/gridBox/verThr/middle';
import { VerTop } from 'orid/lib/layout/gridBox/verThr/top';
import * as React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import '../index.scss';
import { CalcLateFeeRule } from './entity/calcLateFeeRule';
import { LateFeeParamDetailHook } from './hook';
import { LateFeeParamDetail } from './lateFeeParamDetail/ui';
import { ILateFeeParamLayoutProps } from './lateFeeParamLayout/interface';
import { LateFeeParamUiAction } from './uiAction';

const SortableItem = SortableElement(({ value }: any) => <Col style={{ zIndex: 1000 }}>{value}</Col>);
// const SortableContainerr = SortableContainer(({ children }: any) => {
//     return <Row className="ori-table-custom-col-box">{children}</Row>;
// });

const SortableContainerr1 = SortableContainer(({ children }: any) => {
    return <Col>{children}</Col>;
});

const Left = HorTwo.left;
const Right = HorTwo.right;


export class LateFeeParamLayout extends React.Component<ILateFeeParamLayoutProps>{

    public uiAction: LateFeeParamUiAction;

    constructor(props: ILateFeeParamLayoutProps) {
        super(props);
        this.uiAction = new LateFeeParamUiAction(props, this);
        this.uiAction.init();
        this.state = {};
    }

    public componentWillMount() {
        // message.destroy();
        // this.uiAction.getLateFeeSysParam();
    }
    public componentWillUnmount() {
        // this.uiAction.clear();
    }

    public render() {
        const { store } = this.uiAction;
        return (
            <Spin style={{ textAlign: "center", paddingTop: "15%", }} spinning={store.pageLoading} tip={"正在加载中..."} >
                <VerThr>
                    <VerTop className="late-fee-flex">
                        <Button type={'primary'} style={{ marginLeft: '8px' }} onClick={this.uiAction.addTemplateData}>新增</Button>
                        <span>
                            <Button
                                onClick={this.uiAction.ImmediatelyCalcFee}
                                style={{ marginRight: "16px" }}
                            >
                                违约金立即计算
                            </Button>
                            <Icon type="info-circle" title={"点击重新计算违约金按钮，根据当前违约金设置参数立即重新计算违约金"} style={{ color: 'orange', marginLeft: "16px" }} />
                        </span>
                    </VerTop>
                    <VerMiddle>
                        <HorTwo>
                            <Left style={{ textAlign: "center",maxHeight: "calc(100vh - 170px)",minHeight: "calc(100vh - 170px)",overflow:'auto' }}>
                                <div style={{ 
                                    height: "42px",
                                    backgroundColor: "#eeeeee",
                                    textAlign: "center",
                                    margin: "8px",
                                    paddingTop: "4%"

                                }}>
                                    违约金参数
                                    <Icon type="info-circle" title={"系统按照违约金参数顺序进行违约金规则计算"} style={{ color: 'orange', marginLeft: "8px" }} />
                                </div>
                                {
                                    this.getSortContent(store.LateFeeRules)
                                }
                            </Left>
                            <Right style={{ position: "relative" }}>
                                <div style={{ position: "absolute", right: "0px", top: "8px" }}>
                                    <Button style={{ marginRight: "16px" }} onClick={this.uiAction.updateFeeParam}>保存</Button>

                                </div>
                                <FlexAlign xAlign={'center'}>
                                    <LateFeeParamDetail
                                        detail={store.thenLateFeeRule || ({} as any)}
                                        onChange={this.uiAction.changeParamValues}
                                        usercategory={this.uiAction.store.userCategoryTree}
                                        onDetailChange={this.uiAction.changeDetailParamValues}
                                    />
                                </FlexAlign>
                            </Right>
                        </HorTwo>
                    </VerMiddle>
                </VerThr>
            </Spin>

        );
    }


    private getSortContent(LateFeeRules: CalcLateFeeRule[]) {
        return <SortableContainerr1 distance={10} axis="y" onSortEnd={this.uiAction.sortLateFeeRules}>
            {
                LateFeeRules && LateFeeRules.map((model, index) => {
                    return <SortableItem
                        key={`item-${index}`}
                        index={index}
                        value={
                            <LateFeeParamDetailHook
                                key={index}
                                rule={model}
                                select={this.uiAction.store.thenLateFeeRule}
                                onDelete={this.uiAction.deleteLateFeeParam}
                                onSelect={this.uiAction.handleSetThenRule}
                                // onChange={this.uiAction.handleSetThenRuleChange} 编辑模式使用 
                            />
                        }
                    />
                })
            }
        </SortableContainerr1>
    }
}