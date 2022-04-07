import { OridPagination, VerThr } from "orid";
import React from "react";
import { DownLoadFilesSearch } from "./search/ui";
import { DownLoadFilesTable } from "./table/ui";
import { DownLoadFilesUiAction } from "./uiAction";

class DownLoadFilesLayout extends React.Component{ 

    public uiAction: DownLoadFilesUiAction;

    public constructor(props: any) {
        super(props);
        this.uiAction = new DownLoadFilesUiAction(props, this);
    }

    public render() {
        window["downSearch"] = DownLoadFilesSearch;
        return (
            <React.Fragment>
                <VerThr style={{ padding: "8px" }}>
                    <VerThr.top>
                        {React.createElement(DownLoadFilesSearch, {search: this.uiAction.Search, shortList: this.uiAction.store.userShortcutKeyList, payList: this.uiAction.store.payList})}
                    </VerThr.top>
                    <VerThr.middle style={{ marginTop: "16px", paddingBottom: "24px" }}>
                        <DownLoadFilesTable 
                            dataSource={this.uiAction.store.fileInfoList}
                        />
                    </VerThr.middle>
                    <VerThr.bottom>
                        <div style={{ textAlign: "right" }}>
                            <OridPagination 
                                getPageSize={()=>{""}}
                                menuId={"10001700"}  // 前端取消这个功能 仅存储在内存中
                                pageSize={this.uiAction.store.pageSize}
                                pageCount={this.uiAction.store.pageCount}
                                pageIndex={this.uiAction.store.pageIndex}
                                onChange={this.uiAction.paginationChange} 
                                onShowSizeChange={this.uiAction.paginationShowSizeChange} 
                            />
                        </div>
                    </VerThr.bottom>
                </VerThr>
 
            </React.Fragment>
        )
    }

}


export { DownLoadFilesLayout };
