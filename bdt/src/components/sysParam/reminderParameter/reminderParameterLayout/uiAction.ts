import { message } from 'antd'
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { action, observable, } from "mobx";
import { MenuAlertMessageSearchDto } from "./entity";
import { IReminderParameterLayoutProps } from "./interface";

export class ReminderParameterLayoutUiActon {
    /**
     * 单选框是否选中
     */
    @observable
    public isChecked: string;
    /**
     * 是否显示新增/编辑对话框
     */
    @observable
    public isVisiableModal: boolean = false;
    @observable
    public selectedKeys?: any[]
    @observable
    public ischeckChange?: boolean = false
    @observable
    public ischeckArray: any[] = []
    @observable
    public newArray: any[] = []
    /**
     * 操作类型
     */
    @observable
    public opearatorType: "none" | "add" | "edit"

    private props: IReminderParameterLayoutProps
    constructor(props: IReminderParameterLayoutProps) {
        this.props = props;
        this.onIsShowTollBusinessCard = this.onIsShowTollBusinessCard.bind(this);
        this.add = this.add.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.TreeOnSelect = this.TreeOnSelect.bind(this);
        this.loadData = this.loadData.bind(this);
        this.saveMenuAlertMessage = this.saveMenuAlertMessage.bind(this);
        this.isChecked = "1"
        this.selectedKeys = []
        // this.selectId = 0;
    }
    /**
     * 点击水费业务显示水费卡片
     */
    @action
    public onIsShowTollBusinessCard() {
        this.props.reminderParameterStore!.isTollBusinessCard = true

    }
    /**
     *  页面内容变化
     */
    public PageContentChanges() {

        const isPreservation = confirm("提醒参数数据发生改变，是否保存？")
        // console.log("confirm:" + isPreservation)
        if (isPreservation) {
            this.saveMenuAlertMessage()
        } else {
            return;
        }
    }

    /**
     * 默认加载数据
     */
    public async loadData() {
        await this.props.GlobalBusinesstypeStore!.getData();
        const data = this.props.GlobalBusinesstypeStore!.treeData.filter(x => x.IsEnable === "1");
        if (data && data.length === 1) {
            this.props.reminderParameterStore!.NowBusinessTypeId = data[0].BusinessTypeId.toString();
            this.props.reminderParameterStore!.loadDatas();
        }


    }
    /**
     * 点击弹窗X号取消
     */
    @action
    public cancel() {
        // console.log("点击弹窗的X号取消！")

        this.isVisiableModal = false
    }
    /**
     * 点击确定按钮
     */
    @action
    public save(item: MenuAlertMessageSearchDto) {

        this.props.reminderParameterStore!.Add(item);
        this.isVisiableModal = false;
    }

    /**
     * 点击保存按钮
     */
    public saveMenuAlertMessage() {
        // const saveList = new Array<MenuAlertMessageUpdateIsEnable>();
        // this.ischeckChange = false
        // this.ischeckArray = []
        // this.newArray=[]
        // // this.props.reminderParameterStore!.lists.forEach((searchDto: MenuAlertMessageSearchDto) => {
        // //     searchDto.MenuAlertMessages.forEach((entity: MenuAlertMessage) => {
        // //         const saveEntity = new MenuAlertMessageUpdateIsEnable();
        // //         saveEntity.MessageTypeId = entity.MenuAlertMessageId;
        // //         saveEntity.IsEnable = entity.IsEnable;
        // //         saveList.push(saveEntity);
        // //     })
        // // })
        // saveList.map((element: any) => {
        //     if (String(element.IsEnable) === '1') {
        //         this.ischeckArray.push(element)
        //     }
        // })
        // if (this.props.reminderParameterStore!.checkDefaultValue.length !== this.ischeckArray.length) {
        //     this.ischeckChange = false
        // } else {
        //    this.props.reminderParameterStore!.checkDefaultValue.map((element: any) => {
        //        this.ischeckArray.map((elements:any)=>{
        //            if(String(element.MenuAlertMessageId)===String(elements.MenuAlertMessageId)){
        //                this.newArray.push(element)
        //            }
        //         })
        //        })
        //        if(this.newArray.length===this.props.reminderParameterStore!.checkDefaultValue.length){
        //            this.ischeckChange=true
        //        }
        // }
        // if (this.ischeckChange === false) {
        //     this.props.reminderParameterStore!.checkDefaultValue = []
        //     this.props.reminderParameterStore!.checkDefaultValue = this.ischeckArray
        //     this.props.reminderParameterStore!.Update(saveList);
        // } else {
        //     message.info('暂无需要保存的数据')
        // }
        this.props.reminderParameterStore!.Update();
        this.props.reminderParameterStore!.isPageContentChange = false;


    }

    /**
     * 点击添加显示弹窗
     */
    @action
    public add() {
        if (this.props.reminderParameterStore!.NowBusinessTypeId === '') {
            message.info("请先选择业务类型");
            return;
        }
        this.opearatorType = "add";
        this.props.reminderParameterStore!.currentEditItem = new MenuAlertMessageSearchDto();
        // console.log("点击添加，显示弹窗了哦！")
        this.isVisiableModal = true

    }
    /**
     * 树节点选中事件
     * @param selectedKeys 
     * @param e 
     */
    @action
    public TreeOnSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent) {
        this.selectedKeys = selectedKeys

        if (e.selected) {
            // console.log("点击业务类型的布尔值为：" + e.selected)
            // // this.props.reminderParameterStore!.NowBusinessTypeId = selectedKeys[0];
            // console.log("业务类型Id=" + selectedKeys[0])

            const selectKeyArr = selectedKeys[0].split("+")
            const flag = selectKeyArr[2] === 'false' ? false : true
            if (flag) {
                this.props.reminderParameterStore!.NowBusinessTypeId = ''
            } else {
                this.props.reminderParameterStore!.NowBusinessTypeId = selectKeyArr[0]
                this.props.reminderParameterStore!.loadDatas();
            }

        }

    }

}