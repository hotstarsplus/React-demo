import { FormComponentProps } from "antd/lib/form";
import { CalcFeeTypeUiStore } from "../uiStore";
import { CalcFeeTypeFormUiAction } from "./uiAction";

export interface ICalcFeeTypeFormProps extends FormComponentProps{
    store:CalcFeeTypeUiStore
    getAction:(action:CalcFeeTypeFormUiAction)=>void
}
