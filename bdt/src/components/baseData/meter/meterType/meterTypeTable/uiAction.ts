import { message } from "antd";
import { action } from "mobx";
import { MeterTypeDomainStore } from "../domainStore";
import { MeterType, MeterTypeUiEntity } from "../entity";
import { IMeterTypeTableProps } from "./interface";




export class MeterTypeTableUiAction {
    /**
     * 数据接口
     */
    private props: IMeterTypeTableProps;
    /**
     * 数据源
     */
    private domainStore: MeterTypeDomainStore;
    /**
     * 构造方法
     */
    constructor(props: IMeterTypeTableProps) {

        this.props = props;

        this.domainStore = new MeterTypeDomainStore();

        this.loadData = this.loadData.bind(this);

        this.addClick = this.addClick.bind(this);

        this.editClick = this.editClick.bind(this);

        this.deleteClick = this.deleteClick.bind(this);

        this.getMeterTypeId = this.getMeterTypeId.bind(this);

    }

    /**
     * 加载数据
     */
    @action
    public loadData() {
        this.props.loadingData();

    }

    /**
     * 新增事件
     * @param e 
     */
    @action
    public addClick(e: React.SyntheticEvent<HTMLAnchorElement>) {

        e.preventDefault();

        const id = this.getMeterTypeId(e);

        if (!id) { return; };

        this.props.GlobalMeterTypeStore!.CurrentEditMeterType = new MeterType();
        this.props.GlobalMeterTypeStore!.CurrentEditMeterType.FatherId = id;
        this.props.onAdd(this.props.GlobalMeterTypeStore!.CurrentEditMeterType);

    }


    /**
     * 编辑事件
     * @param e 
     */
    @action
    public async editClick(record: MeterTypeUiEntity,e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const entity = new MeterType();
        entity.Description=record.Description;
        entity.FatherId =record.FatherId;
        entity.MeterTypeId=record.value
        entity.MeterTypeName=record.title
        entity.SortNo=record.SortNo;
        entity.CreateDate=record.CreateDate;
        entity.CpCode=record.CpCode;
        this.props.GlobalMeterTypeStore!.CurrentEditMeterType=entity;
        this.props.onEdit(this.props.GlobalMeterTypeStore!.CurrentEditMeterType);
    }

    /**
     * 删除事件
     * @param e 
     */
    @action
    public async deleteClick(record: MeterTypeUiEntity, e: React.SyntheticEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const entity = new MeterType();
        entity.Description=record.Description;
        entity.FatherId =record.FatherId;
        entity.MeterTypeId=record.value
        entity.MeterTypeName=record.title
        entity.SortNo=record.SortNo;
        entity.CreateDate=record.CreateDate;
        entity.CpCode=record.CpCode;
        this.props.GlobalMeterTypeStore!.CurrentEditMeterType=entity;
       
            this.DeleteMeterType(this.props.GlobalMeterTypeStore!.CurrentEditMeterType);

    }

    

    /** 删除水表类型 */
    @action.bound
    public DeleteMeterType(item: MeterType) {
        const store = this.props.GlobalMeterTypeStore!;
        try {
            if (!store.IsLoading) {
                store.IsLoading = true;
            }
            this.domainStore.deleteMeterType(item, store.CompanyName).then((res) => {
                if (res.rtnCode !== 0) {
                    store.IsLoading = false;
                    message.error(res.rtnMsg);
                } else {
                    const jsonList = res.data as MeterType[];
                    store.refreshUi(jsonList);
                    store.IsLoading = false;
                    message.success("删除水表类型成功");
                }
            })
        } catch (error) {
            store.IsLoading = false;
        }
    }


    /**
     * 获取银行ID
     * @param e 
     */
    public getMeterTypeId(e: React.SyntheticEvent<HTMLAnchorElement>): (string | undefined) {

        const id = e.currentTarget.getAttribute("id");
        console.log(id);
        if (!id) {
            message.error("无效的对象id")
            return undefined;
        }
        const index = id.indexOf("_");
        if (index < 0) {
            message.error("无效的对象id")
            return undefined;
        }
        try {
            return id.substring(index + 1);
        } catch (error) {
            return undefined;
        }

    }


     /**
      * 设置指定水表类型ID的水表类型为当前编辑的水表类型
      * @param id 类型ID
      */
      @action
      public SelectedMeterType(id: string): boolean {
          const store = this.props.GlobalMeterTypeStore!;
          try {
              this.recursionSelect(id, store.list);
              return true;
          } catch (error) {
              console.log(error);
              return false;
          }
      }

      /**
       * 递归找到选中的可编辑水表类型
       * @param id 选中的ID
       * @param list 集合 
       */
    @action
    public recursionSelect(id: string, list: MeterType[]) {
        const store = this.props.GlobalMeterTypeStore!;
        if (!list) {
            return;
        }
        list.forEach((wsModel, index, array) => {
            if (id === wsModel.MeterTypeId) {
                console.log(1);
                store.CurrentEditMeterType = wsModel;
            } else if (wsModel.children !== undefined) {
                this.recursionSelect(id, wsModel.children);
            }
        });
    }

}