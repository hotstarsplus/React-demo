import { message } from "antd";
import { action, observable } from "mobx";
import { DeepCopy } from "orid";
import React from "react";
import { AppPrintDataSource, ModuleField } from "../../../../entity";
import { ISingleInput, SingleInput } from "./input";

export class InputUiAction {

    public props: ISingleInput;

    public self: SingleInput;

    @observable
    public show: boolean;

    public content: React.ReactNode

    public antistopList: string[];

    public constructor(props: ISingleInput, self: SingleInput) {
        this.self = self;
        this.props = props;
        this.show = false;
        this.antistopList = [
            "用户号",
            "客户号",
            "用户名",
            "客户名",
            "联系地址",
            "表身号",
            "装表位置",
            "上次余额",
            "胀气年月",
            "是否结清",
            "上次表底数",
            "上次抄表时间",
            "本次表底数",
            "本次超标时间",
            "计费水量",
            "水费金额",
            "违约金",
            "合计费用",
        ]
    }

    /** 鼠标移入显示删除和移动键 */
    @action.bound
    public onMouseEnter() {
        this.show = true;
    }

    @action.bound
    public onMouseLeave() {
        this.show = false;
    }

    /** 名称输入框改变调用 */
    @action.bound
    public FieldNameChange(e: any) {
        this.props.PrintTemplateUiStore!.templateData.map((item) => {
            if (item.ModuleId === this.props.moduleId) {
                item.ModuleField.map((module) => {
                    if (String(module.SortNo) === e.target.name) {
                        module.FieldName = e.target.value;
                    }
                })
            }
        })
        const data = JSON.parse(JSON.stringify(this.props.PrintTemplateUiStore!.templateData));
        this.props.PrintTemplateUiStore!.templateData = [];
        this.props.PrintTemplateUiStore!.templateData = data;
        this.self.setState({})
    }

    /** 内容输入框改变时调用 */
    @action.bound
    public FieldValueChange(e: any) {
        const store = this.props.PrintTemplateUiStore!
        store.templateData.map((item) => {
            if (item.ModuleId === this.props.moduleId) {
                item.ModuleField.map((module) => {
                    if (String(module.SortNo) === e.target.name) {
                        module.FieldValue = e.target.value;
                        this.updataDataSource(item.ModuleId, module.SortNo, module.FieldValue);
                    }
                })
            }
        })
        /** 刷新 */
        const data = JSON.parse(JSON.stringify(store.templateData))
        store.templateData = [];
        store.templateData = data;
        this.self.setState({})
    }

    /** 删除行 */
    @action.bound
    public deleteLine(sortNo: number) {
        this.props.PrintTemplateUiStore!.templateData.map((modal) => {
            if (modal.ModuleId === this.props.moduleId) {
                const Field: ModuleField[] = [];
                modal.ModuleField.map((m2) => {
                    if (m2.SortNo !== sortNo) {
                        Field.push(m2)
                    }
                })
                modal.ModuleField = Field;
            }
        })
        const data = JSON.parse(JSON.stringify(this.props.PrintTemplateUiStore!.templateData))
        this.props.PrintTemplateUiStore!.templateData = [];
        this.props.PrintTemplateUiStore!.templateData = data;
        this.self.setState({})
    }

    @action.bound
    public bindProviderContent(bindValue: AppPrintDataSource[], id: string, bindClick: (value: string) => void) {
        const dataSource: AppPrintDataSource[] = [];
        bindValue.map((m) => {
            if (m.FatherId === id) {
                dataSource.push(m);
            }
        })
        this.content = <div style={{ display: "inline-block", width: "360px", padding: "12px 16px", backgroundColor: "rgba(255,255,255)", color: "rgba(0,0,0,0.6)", margin: "-12px -16px", paddingTop: "5px" }}>
            {dataSource.map((model, index) =>
                <div
                    key={index}
                    style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        padding: "14px 12px",
                        height: "24px",
                        paddingTop: "4px",
                        cursor: "pointer"
                    }}
                    onClick={bindClick.bind(undefined, "[" + model.CnName + "]")}
                >
                    {model.CnName}
                </div>
            )}
        </div>
        return this.content;
    }

    /**  数据源内容 点击添加的回调事件 */
    @action.bound
    public insertAntistop(type: "content", values: string) {
        const store = this.props.PrintTemplateUiStore!
        // let bindValue = ''
        const bindValue = this.insertText(values, "content-textArea");
        // const ruleValue = this.ruleValue(bindValue);
        // console.log('ruleValue', ruleValue)
        // const obj = {};
        // store.source = bindValue;
        // store.emailTitle = ruleValue;
        // obj["emailTitle"] = bindValue;
        console.log('bindValue', bindValue)
        store.templateData.map((modal) => {
            if (modal.ModuleId === this.props.moduleId) {
                modal.ModuleField.map((m2) => {
                    if (m2.SortNo === this.props.item.SortNo) {
                        m2.FieldValue = m2.FieldValue + values;
                        this.updataDataSource(modal.ModuleId, m2.SortNo, m2.FieldValue)
                    }
                })
            }
        })
        /** 刷新 */
        const data = JSON.parse(JSON.stringify(this.props.PrintTemplateUiStore!.templateData))
        store.templateData = [];
        store.templateData = data;
        this.self.setState({})

    }

    /** 根据光标 去添加数据 */
    @action.bound
    public insertText(insertTxt: string, id: string) {
        const elInput = document.getElementsByClassName(id)[0]! as HTMLInputElement;
        const txt = elInput.value;
        const startPos = elInput.selectionStart;
        const endPos = elInput.selectionEnd;
        if (startPos === undefined || endPos === undefined) { return insertTxt };
        const result = txt.substring(0, startPos || 0) + insertTxt + txt.substring(endPos || 0);
        elInput.focus();
        elInput.selectionStart = (startPos || 0) + insertTxt.length;
        elInput.selectionEnd = (startPos || 0) + insertTxt.length;
        return result;
    }

    /** 验证数据 并替换上假数据 */
    @action.bound
    public ruleValue(rule: string): string {
        console.log('rule', rule)
        const findEach = rule.match(/\[.*?\]/g) as string[];
        if (!rule || findEach === null) { return rule };

        let result = rule;
        findEach.forEach((model) => {
            result = result.replace(model, this.antistopList[model.replace("[", "").replace("]", "")] || model.replace("[", "").replace("]", ""));
        })
        return result;
    }

    /**
     * 根据字符串的值，更新数据源
     * @param ModuleId 模块ID（如：客户模块，用户模块）
     * @param SortNo 输入模块的排序号
     * @param FieldValue 输入值
     */
    @action.bound
    public updataDataSource(ModuleId: string, SortNo: number, FieldValue: string) {
        const Source = this.props.loopString(FieldValue)
        const newSource: AppPrintDataSource[] = [];
        this.props.PrintTemplateUiStore!.templateData.map((data) => {
            if (data.ModuleId === ModuleId) { // 找到模块（如：客户，用户）
                data.ModuleField.map((field) => {
                    if (field.SortNo === SortNo) { // 找到输入框
                        this.props.PrintTemplateUiStore!.dataSource.map((item) => {
                            if (item.FatherId === ModuleId) {
                                if (Source.includes(item.CnName)) {  // 判断选出的字符串是否存在对应的数据源
                                    newSource.push(item);
                                }
                            }
                        })
                        field.DataSource = newSource;
                    }
                })
            }
        })
    }

    /** 上移 */
    @action.bound
    public moveUp() {
        const store = this.props.PrintTemplateUiStore!
        const SortNo = this.props.item.SortNo;
        if (SortNo === 0) {
            message.info('已置顶')
            return;
        }

        try {

            const templateData = DeepCopy.deepClone(this.props.PrintTemplateUiStore!.templateData);
            const sortList = templateData.filter((model) => model.ModuleId === this.props.moduleId)[0]!;

            const first = sortList.ModuleField.filter((model) => model.SortNo === (SortNo))[0]!;
            const second = sortList.ModuleField.filter((model) => model.SortNo === SortNo - 1)[0]!;

            first.SortNo = first.SortNo - 1;
            second.SortNo = first.SortNo + 1;

            sortList.ModuleField.sort((xh, xl) => xh['SortNo'] - xl['SortNo']);

            console.log(templateData);
            const data = JSON.parse(JSON.stringify(templateData))
            store.templateData = [];
            store.templateData = data;

            this.props.flushPage();

        } catch (err) {
            throw new Error(err);
        }
    }

    /** 下移 */
    @action.bound
    public moveDown() {
        const store = this.props.PrintTemplateUiStore!
        const SortNo = this.props.item.SortNo;


        try {

            const templateData = DeepCopy.deepClone(this.props.PrintTemplateUiStore!.templateData);
            const sortList = templateData.filter((model) => model.ModuleId === this.props.moduleId)[0]!;
            if (SortNo === sortList.ModuleField.length - 1) {
                message.info('已置底')
                return;
            }
            const first = sortList.ModuleField.filter((model) => model.SortNo === (SortNo))[0]!;
            const second = sortList.ModuleField.filter((model) => model.SortNo === SortNo + 1)[0]!;

            first.SortNo = first.SortNo + 1;
            second.SortNo = first.SortNo - 1;

            sortList.ModuleField.sort((xh, xl) => xh['SortNo'] - xl['SortNo']);

            console.log(templateData);
            const data = JSON.parse(JSON.stringify(templateData))
            store.templateData = [];
            store.templateData = data;

            this.props.flushPage();

        } catch (err) {
            throw new Error(err);
        }
    }





}


