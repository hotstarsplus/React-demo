import { message } from "antd";
import { action } from "mobx";
import { IAppPrintTemplateLayout } from ".";

export class LayoutUiAction{
    public props:IAppPrintTemplateLayout

    public constructor(props:IAppPrintTemplateLayout){
        this.props = props;
        this.Init();
    }

    @action.bound
    public Init() {
        this.getList()
    }

    /** 获取模板列表 */
    @action.bound
    public getList() {
        this.props.PrintTemplateUiStore!.cardLoading = true;
        this.props.PrintTemplateDomainStore!.getPrintTemplateList().then((res) => {
            if (res.rtnCode !== 0) {
                message.error(res.rtnMsg);
                return;
            }
            this.props.PrintTemplateUiStore!.KindList = res.data;
        })
        this.props.PrintTemplateUiStore!.cardLoading = false;
    }
}