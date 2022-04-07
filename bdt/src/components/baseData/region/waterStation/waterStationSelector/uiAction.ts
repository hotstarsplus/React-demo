import { IWaterStationTreeSelectProps } from "./interface";




export class WaterStationTreeSelectUiAction {
    public props:IWaterStationTreeSelectProps;
    constructor(props:IWaterStationTreeSelectProps){
        this.props = props;
        this.onSelect=this.onSelect.bind(this);
    }

    /**
     * 选择时改变排序号的值
     * @param FatherId 选中的父级id
     */
    public async onSelect(FatherId:string){
        // alert(FatherId);
        if(FatherId.length<0){
            FatherId="";
        }
        const index = FatherId.indexOf("_");
        if(index>0){
            FatherId=FatherId.substring(0,index);
        }
        // const maxSortNo = await this.props.GlobalWaterStationStore!.getMaxSortNo(FatherId);
        this.props.getMaxSortNo(FatherId).then((sortNo)=>{
            console.log(sortNo);
            this.props.setFieldsValue!({
                SortNo:sortNo
            });
        })
    }

}