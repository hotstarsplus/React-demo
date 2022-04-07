import { message } from "antd";
import { action } from "mobx";
import { ITemplateEditModal, TemplateEditModal } from ".";
import { LeftUiAction } from "./left/uiAction";

export class TemplateEditUiAction{

    public props:ITemplateEditModal;

    public self:TemplateEditModal

    public LeftuiAction:LeftUiAction

    public constructor(props:ITemplateEditModal,self:TemplateEditModal){
        this.props = props;
        this.self = self;
    }

    @action.bound
    public closeModal(){
        this.props.PrintTemplateUiStore!.templateEditVisible = false;
    }

    /** 模板编辑保存数据 */
    @action.bound
    public submit(){
        this.props.PrintTemplateDomainStore!.saveTempLate(this.props.PrintTemplateUiStore!.templateId,this.props.PrintTemplateUiStore!.templateData).then((res)=>{
            if(res.rtnCode!==0){
                message.error(res.rtnMsg);
                this.props.PrintTemplateUiStore!.templateEditVisible = false;
                return;
            }
            message.success(res.rtnMsg);
            this.props.PrintTemplateUiStore!.templateEditVisible = false;
        })
    }



     /** 遍历输入框的字符串 */
     @action.bound
     public loopString(str: string): string[] {
         const result: string[] = [];
         let front = 0;
         let tar: boolean = false; // false时查找'[',true时查找 ']'
         let rec = [];
         if (str.charAt(front) === '[') { // 首先判断第一位是不是 '['
             tar = true;   // 如果是'['，则从第二位查找']'
         }
         for (let i = 0; i >= 0; i = front) {  // 循环查找
             rec = loop(str, i);
             if (rec[0] === '-1') {
                 front = Number(rec[0]);
                 break;
             }
             if (rec[1] === '[') { // tar为false时应查找'[',因此替换索引值，tar为true时，应查找']',但查到了'[',说明两个中括号嵌套的情况出现了
                 front = Number(rec[0]);
                 tar = true;
                 continue;
             }
             if (tar === false && rec[1] === ']') { // 当tar为false时，应查找'[',查找到']'说明前方没有'['与其匹配
                 front = Number(rec[0]);
                 console.log('无用数据')
                 continue;
             }
             if (tar && rec[1] === ']') { // tar为true，查找到了']',说明有与其匹配的'['
                 result.push(str.substring(front + 1, Number(rec[0])));
                 front = Number(rec[0]);
                 tar = false;
                 continue;
             }
         }
 
         return unique(result);
 
         /** 去重 */
         function unique(arr:string[]) {
             return Array.from(new Set(arr))
         }
 
         function loop(value: string, num: number) {
             const f = value.indexOf('[', num + 1);
             const l = value.indexOf(']', num + 1)
             if (f >= 0 && l >= 0) {
                 if (f < l) {
                     return [String(f), '['];
                 } else {
                     return [String(l), ']'];
                 }
             } else if (l >= 0 && f < 0) {
                 return [String(l), ']'];
             } else if (l < 0 &&f>=0) {
                 return [String(f), '['];
             } else {
                 return ['-1', '']
             }
         }
 
 
     }
}