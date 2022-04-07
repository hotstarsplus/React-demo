import { message } from 'antd';
import { action } from 'mobx';
import { MeterState } from '../entity';
// import { MeterStateDoMainStore } from '../doMainStore';
import { IMeterStateTableProps } from "./interface";


/**
 *  水表状态的Action
 */
export class MeterStateTableUiAction {

    private props: IMeterStateTableProps;

    constructor(props: IMeterStateTableProps) {
        this.props = props;
    }

    /**
     * 点击编辑按钮的回调方法
     */
    @action.bound
    public editClickHandle(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getItemId(e);

        if (!id) { return; };
        const iid = String(id);
        if (this.selectedItem(iid)) {
            this.props.onEdit(this.props.GlobalMeterStateStore!.currentEditItem);
        } else {
            message.error('错误的事件参数');
        }
    }

    /**
     * @param id 选中项目的ID
     */
    @action.bound
    public selectedItem(id: string): boolean {
        const item = this.getItem(id);
        if (!item || item === null) {
            return false;
        } else {
            this.props.GlobalMeterStateStore!.currentEditItem = item;
            return true;
        }
    }

    /**
     * 根据ID对应的水表状态数据
     * @param id 项目ID
     */
    public getItem(id: string): MeterState | null {
        const index = this.getIndex(id);
        return index < 0 ? null : this.props.GlobalMeterStateStore!.list[index];
    }

    /**
     * 根据ID获取集合中的下标
     * @param id 水表状态ID
     */
    public getIndex(id: string): number {
        return this.props.GlobalMeterStateStore!.list.findIndex((value: MeterState, index: number, list: MeterState[]) => {
            return value.MeterStateId === id
        })
    }

    /**
     * 设置行样式
     * @param record 
     * @param index 
     */
    @action.bound
    public setRowClassName(record: any, index: number): string {
        return "tr-class";
    }

    /**
     * 获取选中水表状态的ID
     * @param e 
     */
    @action.bound
    private getItemId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {
        try {
            const id = e.currentTarget.getAttribute('id');

            if (!id) {
                message.error("无效的对象id");
                return undefined;
            }

            const ix = id.indexOf('_');
            if (ix < 0) {
                message.error('无效的对象id');
                return undefined;
            }

            return id.substring(ix + 1);

        } catch (error) {
            message.error(error.message);
            return undefined;
        }
    }




}
/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration: 3
});