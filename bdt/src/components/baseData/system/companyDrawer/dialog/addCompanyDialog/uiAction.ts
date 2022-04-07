import { ICompanyDialogProps } from "./interface";




export class CompanyDialogUiAction{

    private props:ICompanyDialogProps;

    private formValidate:()=>{formData: any,isValidated: boolean};

    constructor(props:ICompanyDialogProps){
        this.props = props;
        this.OnOk = this.OnOk.bind(this);
        this.GetFormValidate = this.GetFormValidate.bind(this);

    }

    /**
     * 获取表单验证
     * @param callback 回调函数
     */
    public GetFormValidate(callback:()=>{formData: any,isValidated: boolean}){
        this.formValidate = callback;
    }


    /**
     * 确定
     */
    public OnOk(){

        const res = this.formValidate();

        if (res.isValidated) {
            this.props.onOk!(res.formData);
        }


    }


}