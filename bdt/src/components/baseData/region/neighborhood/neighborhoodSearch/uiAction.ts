import { action, observable } from "mobx";
import { INeighborhoodSearchprops } from "./interface";

export class NeighborhoodSearchUiAction{

    public props:INeighborhoodSearchprops;
    /**
     * 创建联系人、Id属性
     */
    @observable
    public NeighborhoodLinkMan:string;
    public NeighborhoodId:string;
    public NeighborhoodName:string;
    public NeighborhoodAddress:string;

    /**
     * 构造
     */
    constructor(props:INeighborhoodSearchprops){
        
        this.props = props;


        this.NeighborhoodLinkMan="";

        this.NeighborhoodId="";

        this.NeighborhoodName="";

        this.NeighborhoodAddress="";

        this.neighborhoodInputOnChange = this.neighborhoodInputOnChange.bind(this)
    }

 
     /** 搜索框输入值改变事件 */
     @action
     public neighborhoodInputOnChange(type:any,event: React.ChangeEvent<HTMLInputElement>) {
         if(type==="缴费网点名称"){
             this.NeighborhoodName = event.target.value;
             if (this.NeighborhoodName.length <= 0) {
                 this.props.GlobalNeighborhoodStore!.LoadData();
                 console.log('缴费网点名称')
             }
         }else if(type==="编码"){
             this.NeighborhoodId = event.target.value;
             if (this.NeighborhoodId.length <= 0) {
                 this.props.GlobalNeighborhoodStore!.LoadData();
             }
             console.log('编码')
         }else if(type==="联系人"){
             this.NeighborhoodLinkMan = event.target.value;
             if (this.NeighborhoodLinkMan.length <= 0) {
                 this.props.GlobalNeighborhoodStore!.LoadData();
             }
         }else if(type==="地址"){
            this.NeighborhoodAddress = event.target.value;
            if (this.NeighborhoodAddress.length <= 0) {
                this.props.GlobalNeighborhoodStore!.LoadData();
            }
        }
         
     }
     /** 返回名称 */
     @action 
     public backName=(type:any):any=>{
         if(type==="缴费网点名称"){
            return this.NeighborhoodName
         }else if(type==="编码"){
             return this.NeighborhoodId
         }else if(type==="联系人"){
            return this.NeighborhoodLinkMan 
        }else if(type==="地址"){
            return this.NeighborhoodAddress
       }
         
     }
     /** 查询 */
     @action
     public neighborhoodSearch = (value:any,type:any)=>{
         if(type==="缴费网点名称"){
             this.props.GlobalNeighborhoodStore!.Search("NeighborhoodName", value);
          }else if(type==="编码"){
             this.props.GlobalNeighborhoodStore!.Search("NeighborhoodId", value);
          }else if(type==="联系人"){
            this.props.GlobalNeighborhoodStore!.Search("NeighborhoodLinkMan", value);
        }else if(type==="地址"){
            this.props.GlobalNeighborhoodStore!.Search("NeighborhoodAddress", value);
       }
     }

}
