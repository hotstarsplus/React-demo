import { action } from "mobx";
import { IRegionSearchprops } from "./interface";

export class RegionSearchUiAction{

    public props:IRegionSearchprops;
    /**
     * 编码
     */
    public RegionId:string;
    /**
     * 片区名称
     */
    public RegionName:string;

    /**
     * 构造
     */
    constructor(props:IRegionSearchprops){
        
        this.props = props;
        this.RegionId="";
        this.RegionName="";
    }

 

     /** 搜索框输入值改变事件 */
     @action.bound
     public RegionInputOnChange(type:any,event: React.ChangeEvent<HTMLInputElement>) {
         if(type==="片区名称"){
             this.RegionName = event.target.value;
             if (this.RegionName.length <= 0) {
                 // this.props.GlobalRegionStore!.LoadData();
                 console.log('片区名称')
             }
         }else if(type==="编码"){
             this.RegionId = event.target.value;
             if (this.RegionId.length <= 0) {
                // this.props.GlobalRegionStore!.LoadData();
             }
             console.log('编码')
         }
     }
     /** 返回名称 */
     @action.bound 
     public BackName=(type:any):any=>{
         if(type==="片区名称"){
            return this.RegionName
         }else if(type==="编码"){
             return this.RegionId
         }
         
     }
    //  /** 搜索 */
    //  @action
    //  public regionSearch = (value:any,type:any)=>{
    //      if(type==="片区名称"){
    //          this.props.GlobalRegionStore!.Search("RegionName", value);
    //       }else if(type==="编码"){
    //          this.props.GlobalRegionStore!.Search("RegionId", value);
    //       }
    //  }

}
