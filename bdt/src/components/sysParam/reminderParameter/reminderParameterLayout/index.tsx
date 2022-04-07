import { Button, message, 
    // Card, Checkbox, Col
 } from "antd";
import { inject, observer } from "mobx-react";
import {
    // FlexAlign ,
     HorTwo, } from "orid";
import * as React from "react";
import { BusinessTypeTreeLists } from "../treeList";
import { ReminderParameterCard } from "./card";
import { IReminderParameterLayoutProps } from "./interface";
import { ReminderParameterDialogView } from "./reminderParameterDialog";
import { ReminderParameterLayoutUiActon } from "./uiAction";


@inject("reminderParameterStore","GlobalBusinesstypeStore")
@observer
export class ReminderParameterLayout extends React.Component<IReminderParameterLayoutProps> {
    private uiAction:ReminderParameterLayoutUiActon
    constructor(props:IReminderParameterLayoutProps){
        super(props);
        this.uiAction=new ReminderParameterLayoutUiActon(props);
    }
    public componentWillMount(){
        message.destroy()
    }
    public componentDidMount(){
        this.uiAction.loadData();
        // console.log("reminderParameter componentDidMount()")
    }


    public componentWillUnmount(){
        

        // console.log("点击页面的X号走这里！")
        // console.log("页面内容是否变化："+this.props.reminderParameterStore!.isPageContentChange)
        if(this.props.reminderParameterStore!.isPageContentChange){
            this.uiAction.PageContentChanges();
        }

        this.props.reminderParameterStore!.NowBusinessTypeId = ""
        this.props.reminderParameterStore!.list = [];
    }
    

    public render() {
        return (
            <HorTwo>
                <HorTwo.left>
                <BusinessTypeTreeLists
                         onSelect = {this.uiAction.TreeOnSelect}
                       />
                </HorTwo.left>
                <HorTwo.right>
                    <div style={{marginLeft:"8px"}}>
                <Button
                        onClick={this.uiAction.add}
                        >
                        添加</Button>
                        <Button
                            style={{ marginLeft: "8px" }}
                            onClick = {this.uiAction.saveMenuAlertMessage}
                        >保存</Button>
                       <ReminderParameterCard />
            </div>
                </HorTwo.right>
                <ReminderParameterDialogView
                    handleCancel={this.uiAction.cancel}
                    handleOk={this.uiAction.save}
                    visiable={this.uiAction.isVisiableModal}
                />
            </HorTwo>
        );
    }
}