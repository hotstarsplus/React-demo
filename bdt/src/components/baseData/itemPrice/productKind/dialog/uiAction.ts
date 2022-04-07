import { IProductKindModalProps } from "./interface";




export class ProductKindModalUiAction {


    private props:IProductKindModalProps;

    private validate:()=>{formdata:any,isValidate:boolean};

    constructor(props:IProductKindModalProps){
        this.props = props;
        this.getValidate = this.getValidate.bind(this);
        this.OnOk=this.OnOk.bind(this);
    }


    public getValidate(validate:()=>{formdata:any,isValidate:boolean}){
        this.validate = validate;
    }


    public OnOk(){

        const res = this.validate();

        if (res.isValidate) {
            this.props.onOk!(res.formdata);
        }

    }


}