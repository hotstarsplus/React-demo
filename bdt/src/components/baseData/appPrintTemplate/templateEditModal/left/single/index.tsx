import React from "react";
import { PrintModal } from "../../../entity";
import { LeftSingleUiAction } from "./uiAction";

export interface IBrowseModal {
    /** 单个小模块，（如：客户，用户，水表抄表信息，其他） */
    data: PrintModal;
    loopString: (str: string) => string[];
}

export class BrowseModal extends React.Component<IBrowseModal>{

    public uiAction:LeftSingleUiAction;

    public constructor(props: IBrowseModal) {
        super(props);
        this.uiAction = new LeftSingleUiAction(props,this)
    }

    public render() {
        return (
            this.props.data.ModuleField && this.props.data.ModuleField.length > 0
                ? this.props.data.ModuleField.map((item, index) => {
                    return <div key={index} style={{ width: '100%', marginTop:19}}><span>{item.FieldName + '： ' + this.uiAction.replaceData(item)}</span></div>
                })
                : ''
        )
    }
}