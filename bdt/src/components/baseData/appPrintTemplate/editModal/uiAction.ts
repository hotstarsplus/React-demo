import { message } from "antd";
import { action } from "mobx";
import { OridStores } from "orid";
import { AppPrintTemplate } from "../entity";
import { IEditModal } from "./editModal";

export class EditUiAction {

    public props: IEditModal

    public constructor(props: IEditModal) {
        this.props = props;

    }

    /** 关闭编辑对话框 */
    @action.bound
    public closeEditModal() {
        this.props.PrintTemplateUiStore!.editVisible = false;
    }

    /** 提交编辑数据 */
    @action.bound
    public submit() {
        this.props.PrintTemplateUiStore!.FormUtils.validateFields(async (errors: any, values: any) => {
            if (errors) {
                message.error("表单填写错误");
                return;
            }
            const store = this.props.PrintTemplateUiStore!;
            store.request = new AppPrintTemplate();
            Object.keys(store.request).map((key) => {
                if (values[key] && values[key].length > 0) {
                    store.request[key] = values[key];
                }
            })
            store.request.CpCode = OridStores.authStore.currentOperator.CpCode;
            store.request.IsUse = store.defaultValue.IsUse;
            store.request.TempLateId = store.defaultValue.TempLateId;
            this.props.PrintTemplateDomainStore!.editPrintTemplate(store.request).then((res) => {
                if (res.rtnCode !== 0) {
                    message.error(res.rtnMsg);
                    return;
                }
                message.success(res.rtnMsg);
                store.editVisible = false;
                this.props.getList();

            })

        })
    }



}