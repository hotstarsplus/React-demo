import { IBusinessOfficeTreeSelectProps } from "./interface";

export class BusinessOfficeTreeSelectUiAction{
    private props:IBusinessOfficeTreeSelectProps
    constructor(props:IBusinessOfficeTreeSelectProps){
        this.props=props;
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
        this.props.getMaxSortNo(FatherId).then((sortNo)=>{
            this.props.setFieldsValue!({
                SortNo:sortNo
            });
        })
    }
  
}