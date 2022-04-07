import { SelectValue } from "antd/lib/select";
import { TypeDoMainStore } from "../domainStore";

/**
 * 设备种类下拉选的Props
 */
export interface IDropdownViewProps{
    /**
     * Store
     */
    TreeTypeStore?: TypeDoMainStore;

    onChange?:(value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;

    value?:SelectValue;
}