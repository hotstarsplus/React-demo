import { IMeterTypeSelectorProps } from "./interface";

export class MeterTypeSelectUiAction{
    public props:IMeterTypeSelectorProps;
    /**
     * 构造方法
     */
    constructor(props:IMeterTypeSelectorProps){
        this.props = props;
        this.onSelect=this.onSelect.bind(this);
    }
    /**
     * 选择时改变排序号的值
     * @param FatherId 选中的父级id
     */
    public async onSelect(FatherId:string){
        if(FatherId.length<0){
            FatherId="";
        }
        const index = FatherId.indexOf("_");
        if(index>0){
            FatherId=FatherId.substring(0,index);
        }
        // const maxSortNo = await this.props.GlobalMeterTypeStore!.getMaxSortNo(FatherId);
        this.props.getMaxSortNo(this.props.GlobalMeterTypeStore!.CompanyName,FatherId).then((num)=>{
            const maxSortNo = num;
            this.props.setFieldsValue!({
                SortNo:maxSortNo
            });
        });
    }
}