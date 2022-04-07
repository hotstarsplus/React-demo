export interface IMenuAlertMessage {
    MenuAlertMessageId: string;
    MenuId: string;
    BusinessTypeId: number;
    MessageTypeId: string;
    AlertType: string;
    MenuAlertMessageValue: string;
    IsEnable: string;
}
/**
 * 提醒参数的实体类
 */
// export class MenuAlertMessage implements IMenuAlertMessage {
//     public AutoId: number;
//     public CpCode?: string = ''
//     /**
//      * 提示信息id
//      */
//     @observable
//     public MenuAlertMessageId: string;
//     /**
//      * 菜单id
//      */
//     @observable
//     public MenuId: string;
//     /**
//      * 业务类型id
//      */
//     @observable
//     public BusinessTypeId: number;
//     /**
//      * 提醒参数类型id
//      */
//     @observable
//     public MessageTypeId: string;
//     /**
//      * 提醒方式
//      */
//     @observable
//     public AlertType: string;
//     /**
//      * 提醒内容
//      */
//     @observable
//     public MenuAlertMessageValue: string;
//     /**
//      * 是否启用
//      */
//     @observable
//     public IsEnable: string;

//     public MessageTypeValue: string;

//     /**
//      * 
//      * @param menualertmessageid      提示信息id
//      * @param menuId                  菜单id
//      * @param businesstypeid          业务类型id
//      * @param messagetypeid           提醒参数类型id
//      * @param alerttype               提醒方式
//      * @param menualertmessagevalue   提醒内容
//      * @param isenable                是否启用
//      */
//     constructor(
//         menualertmessageid: string = "",
//         menuId: string = "",
//         // businesstypeid: number = 0,
//         messagetypeid: string = "",
//         alerttype: string = "",
//         menualertmessagevalue: string = "",
//         isenable: string = "",
//     ) {
//         this.MenuAlertMessageId = menualertmessageid;
//         this.MenuId = menuId;
//         this.BusinessTypeId = 0;
//         this.MessageTypeId = messagetypeid;
//         this.AlertType = alerttype;
//         this.MenuAlertMessageValue = menualertmessagevalue;
//         this.IsEnable = isenable;
//     }
// }

export class CardData{
    public BusinessName: string;
    public BusinessID: string;
    public AlertMessage:AlertMessage[]
}

export class AlertMessage{
    public MessageTypeId: string;
    public IsEnable: string;
    public MessageTypeValue: string;
}

export class MenuAlertMessageSearchDto {
    public BusinessName: string;
    public BusinessID: string;
    public BusinessModuleID:string;
    public MessageTypeId: string;
    public IsEnable: string;
    public MessageTypeValue: string;
}


export class MenuAlertMessageUpdateIsEnable {
    public MessageTypeId: string;
    public IsEnable: string;
}

export class CpMenu {
    public BusinessName: string;
    public BusinessID: string;
}

export class AlertMessageType {
    public MessageTypeId: string;
    public MessageTypeValue: string;
}