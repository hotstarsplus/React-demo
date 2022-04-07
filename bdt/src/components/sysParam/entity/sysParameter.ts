/**
 * 系统参数
 */
export class SysParameter{
    /**
     * 参数名
     */
    public Define:string;
    /**
     * 参数值
     */
    public Value:string;
    public CpCode:string=''
    /**
     * 备注
     */
    public Description:string;

    constructor(props?: {
        Define?: string;
        Value?: string;
        CpCode?: string;
        Description?: string;
    }){
        this.Description = props?.Description || "";
        this.CpCode = props?.CpCode || "";
        this.Define = props?.Define || "";
        this.Value = props?.Value || "";
    }
}