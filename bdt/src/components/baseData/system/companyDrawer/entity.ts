
export interface ICpDept{
    /**
     * 部门ID
     */
    DeptId:string;
    
    /**
     * 部门名称
     */
    DeptName:string;

    /**
     * 子集合
     */
    Children?:ICpDept[];

}



export class CompanyInvoice{

    /**
     * 企业信息ID
     */
    public CompanyId:string;
    public CpCode:string=''

    /**
     * 企业名称
     */
    public CompanyName:string;


    /**
     * 企业税号
     */
    public CompanyTaxNo:string;

    /**
     * 企业地址
     */
    public CompanyAddress:string;


    /**
     * 企业电话
     */
    public CompanyTel:string;

    /**
     * 企业银行名称
     */
    public CompanyBankName:string;

    /**
     * 企业银行账号
     */
    public CompanyBankAccount:string;


    constructor(){

        this.CompanyId = "";

        this.CompanyName="";

        this.CompanyTaxNo = "";

        this.CompanyAddress = "";

        this.CompanyTel = "";

        this.CompanyBankName = "";

        this.CompanyBankAccount = "";

    }


}




export class CompanyDrawer{

    /**
     * 是否删除
     */
    public IsDelete:string;

    /**
     * 操作员ID
     */
    public OperatorId:string;

    /**
     * 操作员名称
     */
    public OperatorName:string;

    /**
     * 企业ID
     */
    public CompanyId : string;

}