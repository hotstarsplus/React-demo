import { Form, Input } from "antd";
import { FormCreateOption } from 'antd/lib/form';
import * as React from "react";
import { RegionTreeSelect } from "../regionSelector/ui";
import { IRegionFormProps } from "./interface";
import { RegionFormUiAction } from "./uiAction";

/**
 * 表单样式
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


/**
 * 片区表单视图（只有表单内容，没有提交按钮）
 */
class RegionFormView extends React.Component<IRegionFormProps>{

    private uiAction: RegionFormUiAction;

    /**
     * 构造方法
     */
    constructor(props: IRegionFormProps) {

        super(props);
        this.uiAction = new RegionFormUiAction(props);

    }
    // public componentWillUnmount(){
    //     console.log("remove0000000");
    // }



    /**
     *  组装组件
     */
    public componentDidMount() {
        this.props.getUiAction(this.uiAction);
    }

    public render() {
        const form = this.props.form;
        return (
            <Form>
                <Form.Item {...formLayoutStyle} label="片区ID" style={{ "display": "none" }} >
                    {
                        form.getFieldDecorator(
                            "RegionId",
                            {
                            }
                        )(<Input placeholder="请输入片区ID" />)
                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="上级片区" >
                    {
                        form.getFieldDecorator(
                            "FatherId",
                        )(<RegionTreeSelect
                            onChange={this.uiAction.HandleOnChangeTree}
                            disabled={this.props.GlobalRegionStore!.SelectorDisabled}
                        />)

                    }
                </Form.Item>
                <Form.Item {...formLayoutStyle} label="片区名称">
                    {
                        form.getFieldDecorator(
                            "RegionName",
                            {
                                rules: [{
                                    message: "请输入片区名称（不能全为空格）",
                                    required: true, whitespace: true,
                                }, {
                                    max: 64,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入片区" />)
                    }
                </Form.Item>

                <Form.Item {...formLayoutStyle} label="排序号">
                    {
                        form.getFieldDecorator(
                            "SortNo",
                            {
                                rules: [{
                                    message: '请输入正确的排序号(不能为空)',
                                    required: true,
                                }, {
                                    validator: (rule: any, value: any, callback: any, source?: any, options?: any) => {
                                        if (value && value.length > 0) {
                                            const reg = new RegExp("^[1-9][0-9]{0,8}$");
                                            if (reg.test(String(value))) {
                                                callback()
                                            } else {
                                                callback('请输入正确的排序号(最大值为999999999)')
                                            }
                                        } else {
                                            callback()
                                        }
                                    },
                                }]
                            }
                        )(<Input placeholder="请输入排序号" />)
                    }
                </Form.Item>


                <Form.Item {...formLayoutStyle} label="备注">
                    {
                        form.getFieldDecorator(
                            "Description",
                            {
                                rules: [{
                                },
                                {
                                    max: 256,
                                    message: '超出长度限制',
                                }]
                            }
                        )(<Input placeholder="请输入描述" />)
                    }
                </Form.Item>
            </Form>
        );
    }

}
/**
 * 表单首选项
 */
const formCreateOption: FormCreateOption<IRegionFormProps> = {
    mapPropsToFields(props) {
        const Region = props.GlobalRegionStore.CurrentEditRegion;
        console.log(Region, "region");
        return {
            Description: Form.createFormField({
                value: Region.Description
            }),
            FatherId: Form.createFormField({
                value: Region.FatherId === Region.CpCode ? "" : Region.FatherId
            }),
            RegionName: Form.createFormField({
                value: Region.RegionName
            }),
            RegionId: Form.createFormField({
                value: Region.RegionId
            }),
            SortNo: Form.createFormField({
                value: Region.SortNo
            })
        }
    }
}

export default Form.create<IRegionFormProps>(formCreateOption)(RegionFormView);