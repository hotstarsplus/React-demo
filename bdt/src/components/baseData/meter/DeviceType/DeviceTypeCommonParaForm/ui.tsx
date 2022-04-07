import { Form, Input } from "antd";
import * as form from "antd/lib/form";
import { inject, observer } from "mobx-react";
import React from "react";
import { IDeviceTypeCommonParaFormProps } from "./interface";
import { DeviceTypeCommonParaFormAction } from "./uiAction";

/**
 * 表单宽度
 */
const formLayoutStyle = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

@inject("GlobalDeviceTypeStore")
@observer
class DeviceTypeCommonParaFormView extends React.Component<IDeviceTypeCommonParaFormProps>{
    private uiAction:DeviceTypeCommonParaFormAction;

    constructor(props:IDeviceTypeCommonParaFormProps){
        super(props);
        this.uiAction = new DeviceTypeCommonParaFormAction(props);
    }

    public componentDidMount(){
        // this.props.getAction(this.uiAction);
        this.uiAction.initFormData();
    }

    public render(){
        this.uiAction.viewProps = this.props;
        return(
            <Form style={{maxHeight:"500px",overflowY:"auto"}}>
                {this.getFromItem()}
            </Form>
        );
    }

    // 创建dom
    private getFromItem = () => {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        const getFieldValue = this.props.form.getFieldValue;
        const currentEditItem = this.props.GlobalDeviceTypeStore!.categoryList;
        let sIdx = -1;

        for (let index = 0; index < currentEditItem.length; index++) {
            const element = currentEditItem[index];
            if (this.props.GlobalDeviceTypeStore!.selectCategoryId===element.CategoryId) {
                sIdx = index;
                break;
            }
        }

        const item = currentEditItem![Number(sIdx)];
        const Attributes = { ...item.CommonFields };
       
        
        const arr: any = []
        for (const key in Attributes) {
            if (key) {
                arr.push(Attributes[key].FieldCnName)
            }
        }

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        console.log("keys is "+keys);

        const formItems = keys.map((k: any, index: any) => (
            
            <Form.Item
                {...(index === 0 ? formLayoutStyle : formLayoutStyle)}
                label={`属性${index + 1}`}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {   /** here,1 */
                    
                    initialValue: arr[index] ? arr[index] : '',

                    validateTrigger: ['onBlur', 'onChange']
                })(<Input placeholder={`属性${index + 1}`} style={{ width: '80%', marginRight: 8 }} disabled={true}/>)} {/** here,1 */}
                
            </Form.Item>
        ));
        return formItems;
    }

}

const formCreateOption: form.FormCreateOption<IDeviceTypeCommonParaFormProps> = {
    mapPropsToFields(props) {
        return {
            
        }
    }
}

export default Form.create<IDeviceTypeCommonParaFormProps>(formCreateOption)(DeviceTypeCommonParaFormView);
