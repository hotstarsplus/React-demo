import { action } from "mobx";
import { ISingleModal, SingleModal } from ".";
import { ModuleField } from "../../../entity";

export class SingleUiAction {

    public props: ISingleModal;

    public self: SingleModal;

    public constructor(props: ISingleModal, self: SingleModal) {
        this.props = props;
        this.self = self;

    }

    /** 查询数据源 */


    /** 复选框改变调用 */
    @action.bound
    public checkboxChange(e: any) {
        this.props.PrintTemplateUiStore!.templateData.map((item) => {
            if (item.ModuleId === e.target.value) {
                item.IsUse = String(e.target.checked)
            }
        })
        this.self.setState({})
    }



    /** 新增行 */
    @action.bound
    public addLine() {
        const NO: number[] = [];
        const newLine = new ModuleField();
        let max = 0
        this.props.PrintTemplateUiStore!.templateData.map((modal) => {
            if (modal.ModuleId === this.props.data.ModuleId) {
                modal.ModuleField.map((item) => {
                    NO.push(item.SortNo);
                })
                if(NO.length>0){
                    max = Math.max(...NO);
                }else{
                    max = -1;
                }
                newLine.SortNo = max + 1;
                modal.ModuleField.push(newLine);
            }
        })
        this.self.setState({})
    }

    /** 删除行 */
    @action.bound
    public deleteLine(sortNo: number) {
        this.props.PrintTemplateUiStore!.templateData.map((modal) => {
            if (modal.ModuleId === this.props.data.ModuleId) {
                const Field: ModuleField[] = [];
                modal.ModuleField.map((m2) => {
                    if (m2.SortNo !== sortNo) {
                        Field.push(m2)
                    }
                })
                modal.ModuleField = []
                modal.ModuleField = Field;
            }
        })

        const data = JSON.parse(JSON.stringify(this.props.PrintTemplateUiStore!.templateData))
        this.props.PrintTemplateUiStore!.templateData = [];
        this.props.PrintTemplateUiStore!.templateData = data;
        this.self.setState({})
    }

}