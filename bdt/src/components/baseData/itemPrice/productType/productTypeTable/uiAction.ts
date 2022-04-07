import { message } from "antd";
import { action } from "mobx";
import { IProductTypeTableProps } from "./interface";





export class ProductTypeTableUiAction{

    private props : IProductTypeTableProps;


    constructor(props:IProductTypeTableProps){
        this.props = props;
        this.LoadData = this.LoadData.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Edit = this.Edit.bind(this);
    }

    /**
     * 加载数据
     */
    @action("加载数据")
    public LoadData(){
        this.props.GlobalProductTypeStore!.LoadData();
    }

    /**
     * 删除数据
     */
    public async Delete(id:string){
        
        if(this.props.GlobalProductTypeStore!.SelectRow(id)){

            const item = this.props.GlobalProductTypeStore!.CurrentEditEntity;
            
            if (item.children!==null&&item.children!==undefined&&item.children.length>0) {
                message.error("有子级数据，无法删除");
                return;
            }

            const res = await this.props.GlobalProductTypeStore!.Delete(item);
            if (res) {
                message.success("删除成功");
            }else{
                message.error("删除失败");
            }
        }else{
            message.error("错误的事件参数");
        }

    }



    /**
     * 编辑数据
     */
    @action("编辑数据")
    public Edit(e:React.SyntheticEvent<HTMLAnchorElement>){
        e.preventDefault();
        const id = e.currentTarget.getAttribute("id");
        if(!id){
            return;
        }

        if(this.props.GlobalProductTypeStore!.SelectRow(id)){
            console.log(this.props.GlobalProductTypeStore!.CurrentEditEntity);
            this.props.onEdit(this.props.GlobalProductTypeStore!.CurrentEditEntity);
        }else{
            message.error("错误的事件参数");
        }

       

    }


}