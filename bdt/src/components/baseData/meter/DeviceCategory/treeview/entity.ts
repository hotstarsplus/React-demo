import { observable } from "mobx";

/**
 * 水表类型实体
 */
export class TreeTypeList{

    @observable
    public id:string;

    @observable
    public NodeId:string;
    
    @observable
    public FatherId:string;
    
    @observable
    public NodeName:string;      
    
    @observable
    public IsCategory:string;

   @observable
    public children:TreeTypeList[];

}


export  class DropdownViewList{
    public CategoryId:string;

    public CategoryName:string;

    public LinkTable:string;

    public Description:string;
}
export class TreeTypeUiEntity{

    public NodeId:string;
    
    public NodeName:string;      
    
    public IsCategory:string;

    /**
     * 自增编码
     */
    public key:string;

    /**
     * 代码
     */
    public value:string;

    /**
     * 名称
     */
    public title:string;

    /**
     * 父级ID
     */
    public FatherId:string;
    

    /**
     * 序号
     */
    public SortNo:number;
    

    /**
     * 描述
     */
    public Description:string;

    /**
     * 更新时间
     */
    public UpdateDate:string;

    /**
     * 更新者id
     */
    public UpdaterId:string;

    /**
     * 创建时间
     */
    public CreateDate:string;

    /**
     * 创建者id
     */
    public CreaterId:string;

    /**
     * 子集合
     */
    public children?:TreeTypeUiEntity[];
}
