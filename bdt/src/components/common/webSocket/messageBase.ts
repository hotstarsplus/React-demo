

export class SendMessage{

    /**
     * 票据消息
     */
    public MessageType:string;

    /**
     * 发送数据
     */
    public Data:any;
    


    constructor(msgType:string,data:any){
        this.MessageType = msgType;
        this.Data = data;
    }

}

export class ReceiveMessage{
    /** 
     * 信息类型
     */
    public MessageType : string;
    /** 
     * 返回码
     */
    public ReturnCode : string;
    /** 
     * 返回信息
     */
    public ReturnMsg : string
    /** 
     * 返回数据
     */
    public Data : any;
}