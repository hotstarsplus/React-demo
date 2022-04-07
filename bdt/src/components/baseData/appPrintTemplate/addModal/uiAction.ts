import { message } from "antd";
import { action } from "mobx";
import { OridStores } from "orid";
import { IAddModal } from ".";
import { AppPrintTemplate } from "../entity";

export class AddUiAction {

    public props: IAddModal;



    public constructor(props: IAddModal) {
        this.props = props;
    }

    /** 关闭新增对话框 */
    @action.bound
    public closeAddModal() {
        this.props.PrintTemplateUiStore!.addVisible = false;
        
    }

    /** 提交表单 */
    @action.bound
    public submit() {
        this.props.PrintTemplateUiStore!.FormUtils.validateFields(async (errors: any, values: any) => {
            if (errors) {
                message.error("表单填写错误");
                return;
            }
            const store =  this.props.PrintTemplateUiStore!
            store.request = new AppPrintTemplate();
            Object.keys(store.request).map((key) => {
                if (values[key] && values[key].length > 0) {
                    store.request[key] = values[key];
                }
            })
            store.request.IsUse = '1';
            store.request.CpCode = OridStores.authStore.currentOperator.CpCode;
            console.log('请求体参数', store.request)
            this.props.PrintTemplateDomainStore!.addPrintTemplate(store.request).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    return;
                }
                message.success(res.rtnMsg);
                this.props.getList();
                this.props.PrintTemplateUiStore!.addVisible = false

            })
        })
    }

}