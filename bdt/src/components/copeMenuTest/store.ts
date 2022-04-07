import { observable } from "mobx";
import { CopeMenu } from "./entity";

export class UserUiStore {
    /** 是否打开编辑弹出层 */
    @observable
    public isEditModal: boolean = false;
    
    /** 控制对话框的显示 */
    @observable
    public isVisibleModal: boolean = false;
    
     /** 当前正在编辑的用户 */
     @observable
     public CurrentEditUser: CopeMenu;

    @observable
    public UserTypeList: CopeMenu[];
    /** 构造方法 */
    constructor() {
        this.UserTypeList = new Array<CopeMenu>();
        this.CurrentEditUser = new CopeMenu();
    }

}


