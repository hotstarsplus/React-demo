import { message } from "antd";
import { ReceiveMessage, SendMessage } from "./messageBase";


export class WebSocketUtil{

    /**
     * 单例对象
     */
    private static instance:WebSocketUtil;

    /**
     * WebSocket对象
     */
    private static  webSocket:WebSocket;


    /**
     * 私有构造
     */
    private constructor(){

    }

    /**
     * 获取websocket工具类实例
     */
    public static get Instance():WebSocketUtil{
        
        try {
            
            if (WebSocketUtil.instance===null||WebSocketUtil.instance===undefined) {
                WebSocketUtil.instance =  new WebSocketUtil();
            }

            if (WebSocketUtil.webSocket===null||WebSocketUtil.webSocket===undefined) {
                WebSocketUtil.webSocket = new WebSocket("ws://127.0.0.1:6670/lxbpc控制台");
                WebSocketUtil.instance.Open();
                WebSocketUtil.instance.OnError();

            }else{
                if (WebSocketUtil.webSocket.readyState!==WebSocketUtil.webSocket.OPEN) {
                    WebSocketUtil.webSocket = new WebSocket("ws://127.0.0.1:6670/lxbpc控制台");
                    WebSocketUtil.instance.Open();
                    WebSocketUtil.instance.OnError();
                }
               
            }
           
        } catch (error) {
            console.log(error,"xxxxxxxxxxxxx");
        }
        return WebSocketUtil.instance;
       
    }
    
    /**
     * 打开连接
     */
    public Open(){
        WebSocketUtil.webSocket.onopen = ()=>{
            console.log("webSocket连接成功");
        }
    }

    /**
     * 发送数据
     */
    public Send(messageType:string,data:any):string{
        try {
            if (WebSocketUtil.webSocket.readyState=== WebSocketUtil.webSocket.OPEN) {
                const sendMsg = new SendMessage(messageType,data);
                WebSocketUtil.webSocket.send((JSON.stringify(sendMsg)));
                return "成功";
            }else{
                return "打印客户端未开启";
            }
            
        } catch (error) {
            console.log("发送信息异常",error);
            return error;
        }

    }

    /**
     * 接受数据
     * @param callback 回调方法
     */
    public OnMessage(callback:(messageBase:ReceiveMessage)=>void){
        WebSocketUtil.webSocket.onmessage = (ev:MessageEvent)=>{
            callback(JSON.parse(ev.data) as ReceiveMessage);
            console.log(ev.data,"ev.data");
        }
    }

    /**
     * 关闭连接
     */
    public Close(code?: number, reason?: string){
        WebSocketUtil.webSocket.close(code,reason);
    }

    /**
     * 关闭监听事件
     */
    public OnClose(){
        WebSocketUtil.webSocket.onclose = (ev:CloseEvent)=>{
            console.log(ev);
        }
    }

    /**
     * 错误
     */
    public OnError(){
        WebSocketUtil.webSocket.onerror =()=>{
            console.log("webSocket连接失败");
            message.info("客户端未开启，请打开客户端！")
        }
    }
}