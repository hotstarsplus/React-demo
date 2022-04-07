import { FormComponentProps } from "antd/lib/form";
import { PriceLadderUiStore } from "../../uiStore";
import { LadderCycleEntity } from "../../entity";
import { LadderTypeFormUiAction } from "./uiAction";

export interface ILadderTypeFormProps extends FormComponentProps{
    currentEntity?:LadderCycleEntity;
    GlobalLadderPriceUiStore?:PriceLadderUiStore;
    getUiAction:(uiAction:LadderTypeFormUiAction)=>void
}