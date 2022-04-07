import { message } from "antd";
import { action } from "mobx";
import { DeepCopy, oridController } from "orid";
import { DownLoadFilesDomainStore } from "./domainStore";
import { DownLoadFilesUiStore } from "./store";
import { DownLoadFilesLayout } from "./ui";

class DownLoadFilesUiAction{ 

    public domainStore: DownLoadFilesDomainStore;

    public store: DownLoadFilesUiStore;

    public props: {};

    public cite: DownLoadFilesLayout
    ;
    public constructor(props: {}, cite: DownLoadFilesLayout) {
        this.props = props;
        this.store = new DownLoadFilesUiStore();
        this.domainStore = new DownLoadFilesDomainStore();
        this.cite = cite;
        this.init();
    }

    @action.bound
    public paginationChange(page: number, pageSize?: number) {
        this.store.pageIndex = page || 1;
        this.onSearch(this.store.lactSearchCondition);
    }

    @action.bound
    public paginationShowSizeChange(startIndex: number, size: number) {
        this.store.pageSize = size || 0;
        this.store.pageIndex = 1;
        this.onSearch(this.store.lactSearchCondition);
    }

    @action.bound
    public Search(obj: object) {
        this.store.pageIndex = 1;
        this.onSearch(obj);
    }

    @action.bound
    public onSearch(obj: object) {
        this.store.lactSearchCondition = DeepCopy.deepClone(obj);
        const value = {
            ...obj,
            pageIndex: this.store.pageIndex,
            pageSize: this.store.pageSize,
            cpCode: oridController.authController.getOperatorInfo().CpCode,
        };

        this.domainStore.GetFileInfos(value).then(( res )=> {
            if ( !res || res.rtnCode !== 0 ) {
                message.error(res.rtnMsg);
                return;
            }
            this.store.fileInfoList = res.data;
            this.store.pageCount = res["totalCount"];
            this.cite.setState({});
        })

    }

    @action.bound
    private init() {
        this.domainStore.GetUserShortcutKey().then(( res ) => {
            if ( res.rtnCode === 0 ) {
                this.store.userShortcutKeyList = res["data"];
                this.cite.setState({});
            }else{
                message.error("获取模块列表异常,"+ res.rtnMsg);
            };
        });
        this.getAllCpUserList();
    };

    /**
     * 获取全部操作员列表
     */
    @action.bound
    private async getAllCpUserList() {
        try {
            this.domainStore.getListByCpCode(oridController.authController.getOperatorInfo().CpCode).then(( res ) => {
                if (res.rtnCode === 0) {
                    const data = res.data as Array<{}>;
                    this.store.payList = data;
                } else {
                    message.error(res.rtnMsg);
                };
                this.cite.setState({});
            })
        } catch (error) {
            console.log("error:", error);
            message.error(error);
        }
    }
};


export { DownLoadFilesUiAction };
