import { SelectValue } from "antd/lib/select";
import { action, observable, toJS } from "mobx";
import { PriceLadderUiStore } from "../uiStore";
import { IPriceLadderTableProps } from "./interface";
import { PriceLadderTable } from "./ui";








export class SuperPlanPriceTableUiAction {

    /**
     * 选中的ID
     */
    @observable
    public SelectedId: number;
    /** 自身对象 */
    public selfObj: PriceLadderTable;

    private uiStore: PriceLadderUiStore;



    constructor(props: IPriceLadderTableProps, cite: PriceLadderTable) {
        this.uiStore = props.GlobalLadderPriceUiStore!;
        this.selfObj = cite;
        // this.Delete = this.Delete.bind(this);
        this.SelectedId = -1;
        this.DeleteOnClick = this.DeleteOnClick.bind(this);
        this.OnCancel = this.OnCancel.bind(this);
    }

    /**
     * 删除点击事件
     * @param event 
     */
    @action
    public DeleteOnClick(event: React.MouseEvent<HTMLAnchorElement>) {
        this.uiStore.Loading = true;
        this.SelectedId = Number(event.currentTarget.id);
        this.uiStore.Loading = false;

    }

    // @action
    // public Delete(id:number){

    //     this.uiStore.Loading = true;

    //     const ix = this.uiStore.List.findIndex((entity)=>{
    //         return entity.AutoId===id;
    //     })

    //     if (this.uiStore.List[ix].RowState==="Add") {
    //         this.uiStore.List.splice(ix,1);
    //     }else{
    //         this.uiStore.List[ix].IsDelete="1";
    //         this.uiStore.List[ix].RowState="Delete";
    //     }

    //     this.SelectedId = -1;

    //     this.uiStore.Loading = false;

    // }

    /**
     * 取消气泡弹出框
     */
    @action
    public OnCancel() {
        this.uiStore.Loading = true;
        this.SelectedId = -1;
        this.uiStore.Loading = false;
    }
    /** 阶梯处理时间 */
    @action.bound
    public handleOnChange(record: any, value: SelectValue) {
        const index = this.uiStore.List.findIndex(x => x.WaterFeeItemId === record.WaterFeeItemId);
        if (index !== -1) {
            const entity = this.uiStore.ladderInfoArray.find(x => x.LadderLevel === value);
            console.log("entity", toJS(entity), value);
            if (entity) {
                switch (value) {
                    case 1:
                        this.uiStore.List[index].LadderLevel = value.toString();
                        this.uiStore.List[index].MaxQuantity = entity.MaxLadder;
                        this.uiStore.List[index].MinQuantity = "0";
                        break;
                    case 2:
                        this.uiStore.List[index].LadderLevel = value.toString();
                        this.uiStore.List[index].MaxQuantity = entity.MaxLadder;
                        this.uiStore.List[index].MinQuantity = "first";
                        break;
                    case 3:
                        this.uiStore.List[index].LadderLevel = value.toString();
                        this.uiStore.List[index].MaxQuantity = entity.MaxLadder;
                        this.uiStore.List[index].MinQuantity = "second";
                        break;
                    default:
                        break;
                }

            }
        }
        this.selfObj.setState({});
    }

}