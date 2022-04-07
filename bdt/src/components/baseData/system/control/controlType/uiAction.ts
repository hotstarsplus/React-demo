import { message } from "antd";
import { action, observable } from "mobx";
import { ControlType } from "./entity";
import { IControlTypeTableViewProps } from "./interface";

/**
 * 控制方式action
 */
export class ControlTypeListViewUiAction {
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;

    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";


    /**
     * 操作类型(无操作，新增，编辑)
     */
    private opearatorType: 'none' | 'add' | 'edit';

    private props: IControlTypeTableViewProps;

    /**
     * 构造方法
     * @param props
     */
    constructor(props: IControlTypeTableViewProps) {
        this.props = props;
        this.add = this.add.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.selectedContent = this.selectedContent.bind(this)
    }

    /** 企业名称切换 */
    @action
    public selectedContent(value:any){
        this.props.GlobalControlTypeStore!.Name=value
        const that=this
        getName(this.props.GlobalControlTypeStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.props.GlobalControlTypeStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('企业名称切换:',this.props.GlobalControlTypeStore!.CompanyName)
    }
    /**
     * 新增
     */
    @action
    public add() {
        this.opearatorType = "add";
        this.modaltitle = "新增控制方式";
        this.props.GlobalControlTypeStore!.currentEditItem = new ControlType();
        this.props.GlobalControlTypeStore!.currentEditItem.SortNo = this.props.GlobalControlTypeStore!.maxSortNo;
        this.props.GlobalControlTypeStore!.isVisibleModal = true;
    }
    /**
     * 编辑
     */
    @action
    public edit() {
        this.opearatorType = "edit";
        this.modaltitle = "编辑控制方式";
        this.props.GlobalControlTypeStore!.isVisibleModal = true;
    }
    /**
     * 取消
     */
    @action
    public cancel() {
        this.props.GlobalControlTypeStore!.isVisibleModal = false;
    }
    /**
     * 保存
     * @param item 控制方式实体类
     */
    @action
    public save(item: ControlType) {
        if (this.opearatorType === "add") {
            this.props.GlobalControlTypeStore!.Add(item);
        } else if (this.opearatorType === "edit") {
            this.props.GlobalControlTypeStore!.Update(item);
        }
    }
    /**
     * 回到顶部组件侦听的目标元素
     */
    public backTopTarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

}
/**
 * 修改提醒信息位置、时间
 */

message.config({
    top: 90,
    duration: 3
});