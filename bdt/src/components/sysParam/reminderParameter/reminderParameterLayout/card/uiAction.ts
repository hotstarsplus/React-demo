import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { MenuAlertMessageSearchDto, } from "../entity";
import { IReminderParameterCardProps } from "./interface";

export class ReminderParameterCardUiAction {

    private props: IReminderParameterCardProps;
    constructor(props: IReminderParameterCardProps) {
        this.props = props;
        this.CheckboxOnChange = this.CheckboxOnChange.bind(this);
    }




    /**
     * 勾选单选框
     */
    public CheckboxOnChange(event: CheckboxChangeEvent) {
        this.props.reminderParameterStore!.isPageContentChange = true;
        const item = event.target.value!.toString();

        this.props.reminderParameterStore!.lists.forEach((searchDto: MenuAlertMessageSearchDto) => {
            if (searchDto.MessageTypeId + searchDto.BusinessID === item) {
                searchDto.IsEnable=event.target.checked?"1":"0";
                const data=JSON.parse(JSON.stringify(searchDto));
                this.props.reminderParameterStore!.updateData.push(data);
            }
        })
    }
}