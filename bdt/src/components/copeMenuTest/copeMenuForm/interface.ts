import { FormComponentProps } from "antd/lib/form";
import { UserUiStore } from "../store";
import { CopeMenuFromUiAction } from "./uiAction";


export interface ICopeUserFormProps extends FormComponentProps{

    /**
     * 数据源，在弹出的Form中显示信息
     */
     GlobalUserUiStore : UserUiStore;

     getUiAction:(action:CopeMenuFromUiAction)=>void;

}
