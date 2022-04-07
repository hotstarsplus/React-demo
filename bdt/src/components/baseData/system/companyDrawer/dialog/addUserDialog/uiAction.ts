import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { IUserDialogProps } from "./interface";




export class UserDialogUiAction {


    private props:IUserDialogProps;


    constructor(props:IUserDialogProps){
        this.props = props;
        this.OnTreeSelect = this.OnTreeSelect.bind(this);
        this.OnSelectAll = this.OnSelectAll.bind(this);
        this.OnChecked = this.OnChecked.bind(this);
    }


    public OnTreeSelect(selectedKeys: string[], e: AntTreeNodeSelectedEvent){
        const that=this
        if (e.selected) {
            getCpCode(this.props.GlobalCompanyDrawerDomainStore!.CpDeptList,that)
            this.props.GlobalCompanyDrawerDomainStore!.GetCompanyDrawer(selectedKeys[0]);
        }
        
        
        function getCpCode(list:any,thats:any){
            list.map((element:any)=>{
                if(String(element.DeptId)===String(selectedKeys[0])){
                    thats.props.GlobalCompanyDrawerDomainStore!.CompanyCpCode=element.CpCode
                }
                if(element.Children){
                    getCpCode(element.Children,thats)
                }
            })
        }
    }


    /**
     * 全选/反选
     * @param e 
     */
    public OnSelectAll(e:CheckboxChangeEvent){

        this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList.forEach((model)=>{
                if (e.target.checked) {
                    model.IsDelete="0";
                }else{
                    model.IsDelete="1";
                }
        })
        this.props.GlobalCompanyDrawerDomainStore!.CheckAll=e.target.checked

    }

    /**
     * 名字选中
     * @param e 
     */
    public OnChecked(e:CheckboxChangeEvent){
        this.props.GlobalCompanyDrawerDomainStore!.CheckAll=false
        let i:number=0

        this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList.forEach((model)=>{
           
            if (model.OperatorId===e.target.value) {
                console.log("e.target.value:"+e.target.value)
                if (e.target.checked) {
                    model.IsDelete="0";
                }else{
                    model.IsDelete="1";
                }

            }
        })
        
        this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList.map((element:any)=>{
            if(element.IsDelete==="0"){
                i++
            }
        })
        console.log('111',i)
        if(i===this.props.GlobalCompanyDrawerDomainStore!.CompanyDrawerList.length){
            this.props.GlobalCompanyDrawerDomainStore!.CheckAll=true
        }

    }




}