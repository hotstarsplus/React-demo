/**
 * 主页面所有的行为动作函数，主页面使用时只需要调用即可
 */
import { action, observable } from "mobx";
import { IUserListViewProps } from "./interface";
import { UserUiStore } from "./store";

export class UserListUiAction {

    @observable
    public isVisiableModal: boolean;
    public props: IUserListViewProps;

    /**
     * 弹窗标题
     */
    @observable
    public modaltitle: string = "";

    private uiStore: UserUiStore;

    constructor(props: IUserListViewProps) {
        this.uiStore = props.GlobalUserUiStore!;
    }

    /**
     * 编辑
     */
    @action.bound
    public edit() {
        this.modaltitle = "编辑用户";

        this.uiStore!.isVisibleModal = true;

    }

    /**
     * 新增
     */
    @action.bound
    public async addbtn() {
        this.uiStore!.isVisibleModal = true;
        this.modaltitle = "新增用户"
    }

    /**
     * 取消
     */

    @action.bound
    public cancel() {

        this.uiStore!.isVisibleModal = false;

    }



}