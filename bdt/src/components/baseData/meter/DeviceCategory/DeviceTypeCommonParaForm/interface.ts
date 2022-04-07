import { FormComponentProps } from "antd/lib/form";
import { DeviceCategoryDoMainStore } from "../domainStore";


export interface IDeviceTypeCommonParaFormProps extends FormComponentProps{
    GlobalDeviceCategoryStore?:DeviceCategoryDoMainStore;

    /**
     * 父组件将实现此方法，以获得子组件的action
     * 子组件通过调用此接口方法，将内部的Action 传递给父组件
     */
    // getAction:(action:DeviceTypeCommonParaFormAction)=>void;
}