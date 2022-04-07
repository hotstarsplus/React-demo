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
        const currentEditItem = this.props.GlobalDeviceTypeStore!.categoryList;
        let sIdx = -1;

        for (let index = 0; index < currentEditItem.length; index++) {
            const element = currentEditItem[index];
            if (this.props.GlobalDeviceTypeStore!.selectCategoryId===element.CategoryId) {
                sIdx = index;
                console.log("index is "+sIdx);
                break;
            }
        }
        const item = currentEditItem[Number(sIdx)];
        const Attributes = { ...item.CommonFields };
       
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