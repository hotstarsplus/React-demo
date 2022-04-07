
import { ColumnProps } from 'antd/lib/table';
import { OridFunction } from 'orid';
import React from 'react';

class DownColumns {

    /** 模块名称 */
    public ModuleName: string;

    /** 功能名称 */
    public FeatureName: string;

    /** 文件名称 */
    public FileName: string;

    /** 生成时间 */
    public CreateTime: string;

    /** 操作员 */
    public OperatorName: string;

    /** 生成状态 */
    public GenerateStatus: string;

    /** 下载地址 */
    public DownUrl: string;

    /** 水司代码 */
    public CpCode: string;

    public constructor() {
        this.ModuleName = "";
        this.FeatureName = "";
        this.FileName = "";
        this.CreateTime = "";
        this.OperatorName = "";
        this.GenerateStatus = "";
        this.DownUrl = "";
        this.CpCode = "";
    }

}

const downColumns: Array<ColumnProps<DownColumns>> = [
    {key: "Id", dataIndex: "Id", width: 100, title: "序号", render: (text: any, record: any, index: number)=> React.createElement("span", {}, index+ 1)},
    {key: "ModuleName", dataIndex: "ModuleName", width: 100, title: "模块名称"},
    {key: "FeatureName", dataIndex: "FeatureName", width: 150, title: "功能名称"},
    {key: "FileName", dataIndex: "FileName", width: 250, title: "文件名称"},
    {key: "CreateTime", dataIndex: "CreateTime", width: 200, title: "生成时间"},
    {key: "OperatorName", dataIndex: "OperatorName", width: 100, title: "操作人"},
    {key: "GenerateStatus", dataIndex: "GenerateStatus", width: 200, title: "记录状态"},
    {key: "DownUrl", dataIndex: "DownUrl",  title: "操作", render: (text: string, record: DownColumns,index: number )=> {
        return text
            ? <span style={{ color: "#1890ff", cursor: "pointer" }} onClick={()=> !text || OridFunction.DownLoadIn({url: text, download: decodeURIComponent(text)})}>点击下载</span>
            : ""
            // <span style={{ color: "#1890ff", cursor: "pointer" }} >重新加载</span>
    }},
]
export { DownColumns, downColumns };

