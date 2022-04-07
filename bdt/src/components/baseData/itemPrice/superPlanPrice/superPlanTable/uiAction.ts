import { action, observable } from "mobx";
import { SuperPlanPrice } from "../entity";
import { SuperPlanPriceUiStore } from "../uiStore";
import { ISuperPlanPriceTableProps } from "./interface";








export class SuperPlanPriceTableUiAction {

    /**
     * 选中的ID
     */
    @observable
    public SelectedId: number;

    private uiStore: SuperPlanPriceUiStore;


    constructor(props: ISuperPlanPriceTableProps) {
        this.uiStore = props.GlobalSuperPlanPriceUiStore!;
        this.SelectedId = -1;
        this.handleSave = this.handleSave.bind(this);
        this.Delete = this.Delete.bind(this);
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

    @action
    public Delete(id: number) {

        this.uiStore.Loading = true;

        const ix = this.uiStore.List.findIndex((entity) => {
            return entity.AutoId === id;
        })
        console.log('ix', ix)
        if (this.uiStore.List[ix].RowState === "Add") {
            this.uiStore.List.splice(ix, 1);
        } else {
            this.uiStore.List[ix].IsDelete = "1";
            this.uiStore.List[ix].RowState = "Delete";
            // 修复删除中间数据时水量比例不匹配问题
            if (this.uiStore.List[ix + 1] && ix !== 0) {
                this.uiStore.List[ix - 1].MaxQuantityPercent = String(this.uiStore.List[ix + 1].MinQuantityPercent)
                // 删除首条数据时第二条数据水量比例下限为0
            } else if (this.uiStore.List[ix + 1] && ix === 0) {
                this.uiStore.List[ix + 1].MinQuantityPercent = 0;
            }
        }

        this.SelectedId = -1;

        this.uiStore.Loading = false;

    }

    /**
     * 取消气泡弹出框
     */
    @action
    public OnCancel() {
        this.uiStore.Loading = true;
        this.SelectedId = -1;
        this.uiStore.Loading = false;
    }

    public handleSave(model: SuperPlanPrice) {

        this.uiStore.Loading = true;

        const index = this.uiStore.List.findIndex((entity) => {
            return entity.AutoId === model.AutoId;
        });
        const superPlan = this.uiStore.List.find((entity) => {
            return entity.AutoId === model.AutoId;
        });
        superPlan!.MaxQuantityPercent = model.MaxQuantityPercent;
        superPlan!.MinQuantityPercent = Number(model.MinQuantityPercent);
        superPlan!.Price = Number(model.Price);
        const upSuperPlan = index !== 0 ? this.uiStore.List[index - 1] : null;
        const downSuperPlan = index !== this.uiStore.List.length - 1 ? this.uiStore.List[index + 1] : null;
        if (upSuperPlan !== null) {
            upSuperPlan!.MaxQuantityPercent = superPlan!.MinQuantityPercent.toString();
            if (upSuperPlan!.RowState === "Default") {
                upSuperPlan!.RowState = "Modify";
            }
        }
        if (downSuperPlan !== null) {
            downSuperPlan!.MinQuantityPercent = Number(superPlan!.MaxQuantityPercent);
            if (downSuperPlan!.RowState === "Default") {
                downSuperPlan!.RowState = "Modify";
            }
        }
        if (superPlan!.RowState === "Default") {
            superPlan!.RowState = "Modify";
        }


        this.uiStore.Loading = false;
    }
}