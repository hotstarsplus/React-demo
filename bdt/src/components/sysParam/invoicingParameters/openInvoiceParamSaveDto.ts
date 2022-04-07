import { SysParameter } from '../entity/sysParameter';
import { InvoiceParamEntity } from './cardEntity';
    
export class OpenInvoiceParamSaveDto{

    public SysParameters:SysParameter[];

    /**
     * 开票参数
     */
    public InvoiceParam:InvoiceParamEntity;
    public CpCode:string=''

}