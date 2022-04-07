import { message } from 'antd';
import { DeviceDetailField } from '../../DeviceDetailField/entity';
import { DeviceType } from '../entity';
import { IDeviceTypeFormProps } from './interface';



/**
 * 表单试图Action类
 */
export class DeviceTypeFormUiAction {

    public viewProps: any;

    private id: number = 0
    /**
     * 表单数据
     */
    private formData: DeviceType;


    /**
     * 当前表单的api接口
     */
    private props: IDeviceTypeFormProps;

    /**
     * 表单验证是否通过
     */
    private isValidated: boolean = false;

    /**
     * 构造方法
     * @param props 
     */
    constructor(props: IDeviceTypeFormProps) {

        this.props = props;

        this.validate = this.validate.bind(this); {/*表单验证*/ }

        this.validateClient = this.validateClient.bind(this); {/*表单验证*/ }

        this.validateServer = this.validateServer.bind(this);

        this.add = this.add.bind(this);

        this.remove = this.remove.bind(this);

        this.deleteDom = this.deleteDom.bind(this);
    }
    /**  加载自定义属性数据信息 */
    public initFormData = () => {
        const currentEditItem = this.props.GlobalDeviceTypeStore!;
        const Attributes = { ...currentEditItem.tmpAttr }
        // console.log('init-Attributes',Attributes)
        const arr: any = []
        for (const key in Attributes) {
            if (key) {
                //   console.log('init-key',key)
                arr.push(Attributes[key])
            }
        }
        // console.log('init-arr',arr)
        arr.map((item: any) => {
            this.add(item)
        })
    }
    // 添加dom
    public add = (item: any) => {
        // const currentEditItem = this.props.GlobalDeviceTypeStore!.currentEditItem

        const { form } = this.viewProps; // 创建form
        const keys = form.getFieldValue('keys');
        const kTmp = this.id++;
        let nextKeys;
        if (item.KeyTmp !== -2) {
            item.KeyTmp = kTmp;
            // console.log("show")

        } else {
            const arr = new DeviceDetailField();
            arr.KeyTmp = kTmp;
            arr.DeviceTypeId = this.props.GlobalDeviceTypeStore!.currentEditItem.DeviceTypeId;
            arr.DetailFieldCnName = form.getFieldValue(kTmp);
            arr.IsDelete='0';
            this.props.GlobalDeviceTypeStore!.tmpAttr!.push(arr);
            // console.log("add")
        }
        nextKeys = keys.concat(kTmp);
        console.log("add >>>>"+JSON.stringify(this.props.GlobalDeviceTypeStore!.tmpAttr))
        form.setFieldsValue({
            keys: nextKeys,
        });
        // const arr = new DeviceDetailField();
        // currentEditItem.Attributes!.push(arr);
    };
    // 删除dom
    public remove = (k: number) => {
        const { form } = this.viewProps;
        const keys = form.getFieldValue('keys');

        // console.log('remove_keys',k)
        if (keys.length === 0) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== k),
        });
        const arrs = this.props.GlobalDeviceTypeStore!.tmpAttr!;
        let idx = -1;
        console.log("del-k is " + k);
        for (let index = 0; index < arrs.length; index++) {
            const element = arrs[index];
            if (k === element.KeyTmp) {
                idx = index;
                break;
            }
        }

        if (idx !== -1) {
            arrs![Number(idx)].IsDelete='1';
            // arrs!.splice(Number(idx),1);
        }
        // console.log('keys2',keys);
    };
    // 返回删除dom方法
    public deleteDom = (k: any) => {
        return () => this.remove(k)
    }

    public trimSpace(array: any) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "" || typeof (array[i]) === "undefined") {
                array.splice(i, 1);
                i = i - 1;

            }
        }
        return array;
    }

    /**
     * 表单验证
     */
    public validate(): {
        /** 
         * 是否验证成功
         */
        isValidated: boolean,
        /** 
         * 表单数据
         */
        formData: any
    } {

        this.props.form.validateFieldsAndScroll(this.validateClient);

        if (!this.isValidated) {
            return {
                formData: this.formData,
                isValidated: this.isValidated
            }
        }

        this.validateServer(this.formData);

        return {
            formData: this.formData,
            isValidated: this.isValidated,
        }


    }



    /**
     * 对表单字段进行基本规则验证的回调函数（客户端基本验证）
     * @param {any} errors 错误信息
     * @param {any} values 表单值
     */
    private validateClient(error: any, values: any) {
        this.formData = values;

        if (error) {
            message.error("表单填写错误")
            this.isValidated = false;
            return;
        }

        this.isValidated = true;

    }

    /**
     * 对表单字段进行服务端验证
     * @param {any} values  表单值
     */
    private validateServer(values: any) {



        if (!this.props.GlobalDeviceTypeStore) {
            this.isValidated = true;
            return;
        }

        const otherError = this.props.GlobalDeviceTypeStore.Validate(values);
        if (otherError) {
            message.error(otherError);
            this.isValidated = false;
            return;
        }
        this.isValidated = true;
    }




}
/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration: 3
});