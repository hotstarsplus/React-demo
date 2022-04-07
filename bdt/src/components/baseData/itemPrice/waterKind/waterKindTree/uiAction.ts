import { action } from "mobx";
import { IWaterKindTreeProps } from "./interface";




export class WaterKindTreeUiAction{

    private props:IWaterKindTreeProps;

    constructor(props:IWaterKindTreeProps){
        this.props = props;
        this.LoadData = this.LoadData.bind(this);
    }

    /**
     * 加载数据
     */
    @action("加载数据")
    public LoadData(){
        this.props.GlobalWaterKindStore!.LoadingData();
    }

}