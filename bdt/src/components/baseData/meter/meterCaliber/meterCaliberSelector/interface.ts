import { SelectValue } from "antd/lib/select";
import { MeterCaliberUiStore } from "../uiStore";

/**
 * 水表口径下拉选接口
 */
export interface IMeterCaliberSelectorProps{
    /**
     * 数据源
     */
    GlobalMeterCaliberStore?:MeterCaliberUiStore;
    /**
     * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
     */
    onChange?: (value: SelectValue, option: React.ReactElement<any> | Array<React.ReactElement<any>>) => void;
    /**
     * 当前选择项
     */
    value?: SelectValue
}