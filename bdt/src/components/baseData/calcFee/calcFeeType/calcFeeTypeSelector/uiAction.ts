import { message } from "antd";
import { action } from "mobx";
import { CalcFeeTypeDomainStore } from "../domainStore";
import { CalcFeeType } from "../entity";
import { CalcFeeTypeUiStore } from "../uiStore";
import { ICalcFeeTypeSelectorProps } from "./interface";

export class CalcFeeTypeSelectorUiAction {

    public props: ICalcFeeTypeSelectorProps;

    private uiStore: CalcFeeTypeUiStore;

    private domainStore: CalcFeeTypeDomainStore;

    public constructor(props: ICalcFeeTypeSelectorProps) {
        this.props = props;
        this.uiStore = props.GlobalCalcFeeTypeStore!;
        this.domainStore = new CalcFeeTypeDomainStore();
        this.Init();
    }

    @action.bound
    public Init(){
        this.loadDataByBusinessType(this.props.businessTypeId);
    }

    @action.bound
    public loadDataByBusinessType(typeId: number) {
        try {
            this.uiStore.isLoading = true;
            this.uiStore.listByBusinessType = new Array<CalcFeeType>();
            this.domainStore.getListByBusinessType(typeId, this.uiStore.cpCode).then((res) => {
                if (res.rtnCode !== 0) {
                    this.uiStore.isLoading = false;
                    message.error(res.rtnMsg);
                    return;
                } else {
                    const datas = res.data as CalcFeeType[];
                    this.uiStore.listByBusinessType = datas;
                    this.uiStore.isLoading = false;
                }
            })
        } catch (error) {
            console.log(error);
        }
        this.uiStore.currentEditItem = new CalcFeeType();
    }


}