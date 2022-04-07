import { Card, Checkbox, Col, } from 'antd';
import { inject, observer, } from 'mobx-react';
import { FlexAlign } from 'orid';
import * as React from 'react';
import { AlertMessage, CardData } from '../entity';
import { IReminderParameterCardProps } from './interface';
import { ReminderParameterCardUiAction } from './uiAction';

@inject("reminderParameterStore")
@observer
export class ReminderParameterCard extends React.Component<IReminderParameterCardProps>{
    private uiAction: ReminderParameterCardUiAction
    constructor(props: IReminderParameterCardProps) {
        super(props);

        this.renderCard = this.renderCard.bind(this);
        this.renderCardInside = this.renderCardInside.bind(this);
        this.uiAction = new ReminderParameterCardUiAction(props)
    }
    public render() {
        return (
            <div style={{ marginTop: "16px" }} >

                <>
                    {
                        this.renderCard()
                    }
                </>
            </div>
        );
    }
    private renderCard() {
        const cardList = this.props.reminderParameterStore!.dataList
        const list = new Array<JSX.Element>();
        cardList.forEach((dataList: CardData, key) => {

            list.push(<Col
                span={6}
                style={{ padding: "4px", height: "150px" }}
                key={key}
            >
                <Card title={dataList.BusinessName} style={{ height: "100%"}} bodyStyle={{overflowY:"auto"}} >
                    <div>

                        {
                            this.renderCardInside(dataList)
                        }
                    </div>
                </Card>
            </Col>)

        })

        return list;
    }
    private renderCardInside(dataList: CardData) {
        const list = new Array<JSX.Element>();
        dataList.AlertMessage.forEach((item: AlertMessage) => {
            if (item.MessageTypeId !== null) {
                list.push(
                    <FlexAlign key={item.MessageTypeId}>
                        <Checkbox
                            defaultChecked={item.IsEnable === "1" ? true : false}
                            value={item.MessageTypeId + dataList.BusinessID}
                            onChange={this.uiAction.CheckboxOnChange}
                        >
                            <span>{item.MessageTypeValue}</span>
                        </Checkbox>
                    </FlexAlign>
                )
            }
        })
        return list
    }

}