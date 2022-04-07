import { message } from "antd";
import { action } from "mobx";
import { AppPrintTemplate } from "../entity";
import { IAppPrintCard } from "./AppPrintCard";

export class CardUiAction {

    public props: IAppPrintCard;

    public constructor(props: IAppPrintCard) {
        this.props = props;

    }



    /** 鼠标移入 */
    @action.bound
    public HandleMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
        this.props.PrintTemplateUiStore!.ShowTempId = event.currentTarget.id;
    }

    /** 鼠标移出 */
    @action.bound
    public HandleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
        this.props.PrintTemplateUiStore!.ShowTempId = "";
    }

    /** 打开编辑对话框 */
    @action.bound
    public openEdit(record: AppPrintTemplate) {
        this.props.PrintTemplateUiStore!.defaultValue = new AppPrintTemplate();
        this.props.PrintTemplateUiStore!.defaultValue = record;
        this.props.PrintTemplateUiStore!.editVisible = true;
        console.log('defaultValue', this.props.PrintTemplateUiStore!.defaultValue);
    }

    /** 删除打印模板 */
    @action.bound
    public delete(id: string) {
        this.props.PrintTemplateDomainStore!.deletePrintTemplate(id).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            message.success(res.rtnMsg);
            this.props.getList();

        })
    }

    /** 复制模板 */
    @action.bound
    public copyTemplate(record: AppPrintTemplate) {
        this.props.PrintTemplateUiStore!.defaultValue = new AppPrintTemplate();
        this.props.PrintTemplateUiStore!.defaultValue = record;
        this.props.PrintTemplateUiStore!.copyVisible = true;
    }

    /** 是否启用开关 */
    @action.bound
    public handelIsUse(temp: AppPrintTemplate) {
        console.log('temp', temp)
        let body = new AppPrintTemplate();
        body = temp;
        if (temp.IsUse === '0') {
            body.IsUse = '1';
        } else {
            body.IsUse = '0';
        }
        this.props.PrintTemplateDomainStore!.editPrintTemplate(body).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            this.props.getList();

        })
    }

    /** 打开编辑模板对话框 */
    @action.bound
    public OpenEditTemplateModal(record: AppPrintTemplate) {
        this.props.PrintTemplateUiStore!.templateData = [];
        this.props.PrintTemplateUiStore!.templateName = record.TempLateName;
        this.props.PrintTemplateUiStore!.templateId = record.TempLateId;
        /** 查询模板编辑数据 */
        this.props.PrintTemplateDomainStore!.getTemplateEditData(String(record.TempLateId)).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            this.props.PrintTemplateUiStore!.templateData = res.data
            this.props.PrintTemplateUiStore!.templateData.map((item, index) => {
                item.ModuleField = item.ModuleField.sort(this.compare('SortNo'));
            })
            this.props.PrintTemplateUiStore!.templateEditVisible = true;
        })
        /** 查询数据源数据 */
        this.props.PrintTemplateUiStore!.dataSource = []
        this.props.PrintTemplateDomainStore!.getDataSource(String(record.AppPrintTypeId)).then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            this.props.PrintTemplateUiStore!.dataSource = res.data;
        })

        


    }

    public compare(sign: string){
        return (a: any, b: any)=> {
            const v1 = a[sign];
            const v2 = b[sign];
            return v1 - v2;
        };
    }


}