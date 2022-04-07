
export interface IOrganizationTopSearch {
    /**
     * 组织树数据源
     */
    organizationTreeData:any[];
    /**
     * 组织树的选中值(受控)
     */
    organizationTreeValue:string|string[];
    /** 
     * 是否显示新增按钮
     * (用于企业票据:一个组织只能新增一个企业票据信息,添加过企业票据信息的隐藏新增按钮)
     */
    isShowAddBtn?: boolean; 
    /**
     * 组织树单击选中回调
     * 返回选择的组织树信息
     */
    onOrganizationTreeClickHandler?: (value:any) =>  void;
    /**
     *  查询按钮单击回调
     */
    onSearchClickHandler?:() => void;
    /**
     *  新增按钮单击回调
     */
    onAddBtdClickHandler?:() => void;
    
}