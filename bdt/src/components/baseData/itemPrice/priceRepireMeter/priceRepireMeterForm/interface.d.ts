import { FormComponentProps } from "antd/lib/form";
import { PriceRepireDoMainStore } from "../domainStore";
import { PriceRepireMeterFormUiAction } from "./uiAction";

export interface IPriceRepireMeterFormProps extends FormComponentProps{
    GlobalPriceRepireMeterStore?:PriceRepireDoMainStore;

    getAction:(action:PriceRepireMeterFormUiAction) => void;
}