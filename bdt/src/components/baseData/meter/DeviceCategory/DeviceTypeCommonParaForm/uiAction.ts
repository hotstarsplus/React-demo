import { IDeviceTypeCommonParaFormProps } from "./interface";


export class DeviceTypeCommonParaFormAction{

    
    public viewProps: any;

    private id: number = 0;

    private props:IDeviceTypeCommonParaFormProps;

    constructor(props:IDeviceTypeCommonParaFormProps){
        this.props = props;
    }

    /**  加载自定义属性数据信息 */
    public initFormData = () => {

        const Attributes =this.props.GlobalDeviceCategoryStore!.currentItem;

       
        // console.log('init-Attributes',Attributes)
        const arr: any = []
        for (const key in Attributes) {
            if (key) {
                //   console.log('init-key',key)
                arr.push(Attributes[key])
            }
        }
        // console.log('init-arr',arr)
        arr.map(() => {
            this.add()
        })
    }

    // 添加dom
    public add = () => {

        const { form } = this.viewProps; // 创建form
        const keys = form.getFieldValue('keys');
        const kTmp = this.id++;
        const nextKeys = keys.concat(kTmp);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
}