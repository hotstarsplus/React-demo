interface IZoneTreeProps {
    /** 顶部查询组件 */
    TopSearch?: any
    /** 数据表格组件 */
    ReportDataTable: any
    /** 导出选中的id值 */
    PutOutSelectId: (value: any) => void
    /** 底部表格组件 */
    BottomReportDataTable?: any
    /** 导出选中的类型 */
    PutOutSelectType: (value: any) => void
    /** 导出选中的cpCode */
    PutOutSelectCpCode: (value: any) => void
    /** 页面编码 */
    pageCode: string;
    /** 左右结构布局的右侧顶部搜索条件 */
    middleTopSearch?: any
    fatherDomClassName?: string
    /** 样式名 */
    className?: string;
    /** cpcode */
    Organization?: string;
    /** 最外层style设置 */
    outerStyle?: React.CSSProperties;
}

export { IZoneTreeProps };