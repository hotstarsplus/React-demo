import { InvoiceingParametersdoMainStore } from "../doMainStore";
// import { InvoiceingParameters } from "../entity";

export interface ISetupProps{

    InvoicingParametersdoMainStore?:InvoiceingParametersdoMainStore;
    /**
     * 编辑视图是否显示
     */
    visible:boolean;

    /**
     * 取消时的回调方法
     */
    handleCancel:()=>void;

    handleok:()=>void;

    /**
     * 删除之后的回调
     */
    afterDelete?:()=>void;
    
    /**
     * 保存按钮的回调
     */
    // handleOk:(item:InvoiceingParameters)=>void;

}