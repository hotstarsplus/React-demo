/**
 * 当前组件所有的行为动作函数，组件使用时只需要调用即可
 */

import { action } from "mobx";
import { CopeMenu } from "../entity";
// import { UserUiStore } from "../store";
import { IUserTableProps } from "./interface";


export
class UserTableUiAction{

    private props: IUserTableProps;

    // private uiStore: UserUiStore;

    constructor(props:IUserTableProps){
        this.props = props;
        
        // this.uiStore = props.GlobalUserUiStore!;
    }

    /**
     * 编辑事件
     * @param e 
     */
    @action.bound
    public async editClick(record:CopeMenu,e: React.SyntheticEvent<HTMLAnchorElement>) {
        /**
         * 只是状态标识，弹出表单不由其控制
         */
        this.props.GlobalUserUiStore!.isEditModal = true;
        e.preventDefault();
        const entity = new CopeMenu();
            entity.UserName=record.UserName;
            entity.UserSex=record.UserSex;
            entity.UserAddress=record.UserAddress;
            entity.FatherId =record.FatherId;
            entity.UserState=record.UserState
            entity.PhoneNumber=record.PhoneNumber
            this.props.GlobalUserUiStore!.CurrentEditUser=entity;
            this.props.onEdit(this.props.GlobalUserUiStore!.CurrentEditUser);
    }
}