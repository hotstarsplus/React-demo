import { observable } from "mobx";
import { DownColumns } from "./table/tableStract";

class DownLoadFilesUiStore{ 

    @observable public pageSize: number;

    @observable public pageIndex: number;

    @observable public pageCount: number;

    @observable public fileInfoList: DownColumns[];

    @observable public userShortcutKeyList: any[];

    @observable public lactSearchCondition: {};
    /** 操作人员列表 */
    @observable public payList: Array<{}>;
    
    public constructor() {
        this.pageCount = 0;
        this.pageIndex = 1;
        this.pageSize = 20;
        this.payList = [];
        this.fileInfoList = [];
        this.userShortcutKeyList = [];
        this.lactSearchCondition = {};
    }

}


export { DownLoadFilesUiStore };
