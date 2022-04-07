import { action } from "mobx";
import { IDeviceTypeSearchProps } from "./interface";


export class DeviceTypeSearchUiAction{

    public props:IDeviceTypeSearchProps;

    public deviceTypeId:string;

    public deviceTypeName:string;

    constructor(props:IDeviceTypeSearchProps){
        this.props = props;
        this.deviceTypeId = "";
        this.deviceTypeName="";
        this.deviceTypeInputOnChange = this.deviceTypeInputOnChange.bind(this);

    }

    /**
     * 搜索输入框改变事件
     */
    @action
    public deviceTypeInputOnChange(type:any,event: React.ChangeEvent<HTMLInputElement>){
        if (type==="类型编码") {
            this.deviceTypeId = event.target.value;
            if (this.deviceTypeId.length<=0) {
                this.props.GlobalDeviceTypeStore!.loadData();
            }
        }else if (type==="类型名称"){
            this.deviceTypeName = event.target.value;
            if (this.deviceTypeName.length<=0) {
                this.props.GlobalDeviceTypeStore!.loadData();
            }
        }
    }

    @action
    public backName=(type:any):any=>{
        if (type==="类型编码") {
            return this.deviceTypeId;
        }else if (type==="类型名称") {
            return this.deviceTypeName
        }
    }

    /**
     * 查询方法
     */
    @action
    public deviceTypeSearch = (type:string,value:string)=>{
        console.log("value:"+value+",type:"+type)

        if (value==="类型编码") {
            this.props.GlobalDeviceTypeStore!.Search("DeviceTypeId",type);
        }else if (value==="类型名称") {
            this.props.GlobalDeviceTypeStore!.Search("DeviceTypeName",type);
        }
    }

}