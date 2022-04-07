import { action } from "mobx";
import { IDeviceArchiveTypeTableViewProps } from "./interface";

export class DeviceArchiveTypeUIAction{

    private props:IDeviceArchiveTypeTableViewProps;

    constructor(props:IDeviceArchiveTypeTableViewProps){
        this.props = props;
        this.loadData = this.loadData.bind(this);
        this.selectedContent = this.selectedContent.bind(this)
    }
    /**
     * 选择企业名称查询
     */
    @action
    public selectedContent(value:any){
        this.props.GlobalDeviceArchiveTypeStore!.Name=value
        const that=this
        getName(this.props.GlobalDeviceArchiveTypeStore!.CompanyNameData,that)
        function getName(list:any,thats:any){
            list.map((element:any)=>{
                if(String(value)===String(element.OrganitionCode)){
                    thats.props.GlobalDeviceArchiveTypeStore!.InfoName=element.OrganizationName
                }
                if(element.Children){
                    getName(element.Children,thats)
                }
            })
        }
        console.log('企业名称:',this.props.GlobalDeviceArchiveTypeStore!.CompanyName)
    }

    @action
    public loadData(){
        this.props.GlobalDeviceArchiveTypeStore!.loadData();
    }
}