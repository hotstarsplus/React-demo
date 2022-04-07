import { observable } from "mobx";

export interface IControlType {
    ControlTypeId: string;
    ControlTypeName: string;
    SortNo: number;
    Description:string;
    IsDelete: string;
    CreaterId: string;
    CreateDate: string;
    UpdateId: string;
    UpdateDate: string;

}

export class ControlType implements IControlType {
    @observable
    public ControlTypeId: string;

    @observable
    public ControlTypeName: string;
    
    @observable
    public SortNo: number;
    
    @observable
    public Description: string;

    @observable
    public IsDelete: string;

    @observable
    public CreaterId: string;

    @observable
    public CreateDate: string;

    @observable
    public UpdateId: string;

    @observable
    public UpdateDate: string;
    @observable
    public CpCode?:string=''

   /**
    * 
    * @param { string } controltypeid   控制方式Id
    * @param { string } controltypename 控制方式名称
    * @param { number } sortno          排序
    * @param { string } description     备注
    * @param { string } isdelete        删除 '0' 未删除  '1' 已删除
    * @param { string } createrid       创建者
    * @param { string } createdate      创建时间
    * @param { string } updateid        更新者id
    * @param { string } updatedate      更新时间
    */
    constructor(
        controltypeid:string="",controltypename:string="",
       // sortno:number=0,
        description:string="",isdelete:string="",
        createrid:string="",createdate:string="",
        updateid:string="",updatedate:string=""
        ) {
        this.ControlTypeId=controltypeid;
        this.ControlTypeName=controltypename;
        this.SortNo=0;
        this.Description=description;
        this.IsDelete=isdelete;
        this.CreaterId=createrid;
        this.CreateDate=createdate;
        this.UpdateId=updateid;
        this.UpdateDate=updatedate;

    }
}