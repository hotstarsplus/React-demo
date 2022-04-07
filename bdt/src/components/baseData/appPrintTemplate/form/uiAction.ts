import { action } from "mobx";
import { AppPrintTemplate } from "../entity";
import { BillForm, IBillForm } from "./billForm";

export class BillFormUiAction {

    public props: IBillForm;

    /** 控制新增 */
    public nameDisable: boolean

    public cite: BillForm;

    public constructor(props: IBillForm, cite: BillForm) {
        this.props = props;
        this.cite = cite;
        this.nameDisable = true;
        this.Init()
    }

    @action.bound
    public Init(){
        this.props.PrintTemplateUiStore.FormUtils = this.props.form;
    }

    /** 模板名称验证 */    
    @action.bound
    public handleValidator(rule: any, val: string, callback: any) {
        let appPrintTemplateList: AppPrintTemplate[] = [];
        this.props.PrintTemplateUiStore!.KindList.map((item) => {
            if (String(item.AppPrintTypeId) === this.props.PrintTemplateUiStore.selectType) {
                appPrintTemplateList = item.AppPrintTemplates;
            }
        })
        
        if (this.props.message === "编辑") {
            const TempLateName = this.props.PrintTemplateUiStore.defaultValue.TempLateName; 
            const name = appPrintTemplateList.filter((model) => String(model.TempLateName) === String(val) && String(model.TempLateName) !== TempLateName);
            if (name.length > 0) {
                callback('打印模板名称已存在');
            } else {
                callback();
            }
        } else {
            if (appPrintTemplateList.filter((model) => String(model.TempLateName) === String(val)).length > 0) {
                callback('打印模板名称已存在');
            } else {
                callback();
            }
        }

    }

    /** 所属类型改变时调用 */
    @action.bound
    public HandlePrintTemplateTypeOnChange(value: string) {
        this.nameDisable = false;
        this.props.PrintTemplateUiStore.selectType = value;
        this.props.form.setFieldsValue({
            TempLateName: "",
        })
    }



}