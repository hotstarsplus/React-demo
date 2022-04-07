import { SelectValue } from "antd/lib/select";
import { WaterProductDoMainStore } from "../domainStore";

export interface IBillTypeMenuSelectProps{
    GlobalWaterProductStore?:WaterProductDoMainStore
    onChange?: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    value?:string;
}