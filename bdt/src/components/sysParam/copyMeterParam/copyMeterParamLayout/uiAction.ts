import { message } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { SelectValue } from "antd/lib/select";
import { observable } from "mobx";
import { CopyMeterParamDto } from "../../entity/CopyMeterParamDto";
import { QuantityCompareParamEntity } from "../../entity/QuantityCompareParamEntity";
import { ICopyMeterParamLayoutProps } from "./interface";

export class CopyMeterParaLayoutUiAction{

    public QuantityParamEnable:string;

    public IsCopyAddOne:string;

    public IsCanChangeAfterCopid:string;

    public AlarmQuantity:string="";

    public ReferQuantityUp:string="";

    public ReferQuantityDown:string="";

    @observable
    public quantityParamDtoLoading:boolean

    private upNumber:number=0;

    private downNumber:number=0;

    private props:ICopyMeterParamLayoutProps;

    private upFlag:boolean = true;

    private downFlag:boolean = true;


    constructor(props:ICopyMeterParamLayoutProps){
        this.props = props;
        this.quantityParamDtoLoading = true;
        this.QuantityParamEnableOnChange = this.QuantityParamEnableOnChange.bind(this);
        this.AlarmQuantityOnChange = this.AlarmQuantityOnChange.bind(this);
        this.ReferQuantityUpOnChange = this.ReferQuantityUpOnChange.bind(this);
        this.ReferQuantityDownOnChange = this.ReferQuantityDownOnChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.save = this.save.bind(this);
        this.IsCopyAddOneOnChange = this.IsCopyAddOneOnChange.bind(this);
        this.IsCanChangeAfterCopidOnChange = this.IsCanChangeAfterCopidOnChange.bind(this);

    }

    public  IsCopyAddOneOnChange(e:CheckboxChangeEvent){
        const isCopyAddOne = this.props.copyMeterParamDoMainStore!.QuantityParamDto.IsCopyAddOne==="0"?"1":"0"; // 触发控件渲染
        this.props.copyMeterParamDoMainStore!.QuantityParamDto.IsCopyAddOne = isCopyAddOne;
        this.IsCopyAddOne = isCopyAddOne;
        console.log("手工抄表参数-表读数归零时是否需要加1",this.IsCopyAddOne,e.target.checked)
    }
    public IsCanChangeAfterCopidOnChange(e:CheckboxChangeEvent){
        const IsCanChangeAfterCopid = this.props.copyMeterParamDoMainStore!.QuantityParamDto.IsCanChangeAfterCopid==="0"?"1":"0"; // 触发控件渲染
        this.props.copyMeterParamDoMainStore!.QuantityParamDto.IsCanChangeAfterCopid = IsCanChangeAfterCopid;
        this.IsCanChangeAfterCopid = IsCanChangeAfterCopid;
        console.log("手工抄表参数-抄表之后不允许直接修改本次表底数",this.IsCanChangeAfterCopid,e.target.checked)
    }

    public QuantityParamEnableOnChange(e:CheckboxChangeEvent){
        const QuantityCompareIsEnable = this.props.copyMeterParamDoMainStore!.QuantityParamDto.QuantityCompareIsEnable==="0"?"1":"0"; // 触发控件渲染
        this.props.copyMeterParamDoMainStore!.QuantityParamDto.QuantityCompareIsEnable = QuantityCompareIsEnable;
        this.QuantityParamEnable = QuantityCompareIsEnable;
        console.log("抄表参数-水量对比-是否启用",this.QuantityParamEnable,e.target.checked)
    }

    /**
     * 下拉选择水量参考水量变化事件
     * @param value 
     */
    public AlarmQuantityOnChange(value:SelectValue){
        this.AlarmQuantity = value.toString();
        this.props.copyMeterParamDoMainStore!.AlarmQuantityIndex = this.AlarmQuantity;
    }

    /**
     * 参考水量上限改变事件
     * @param value 
     */
    public ReferQuantityUpOnChange(event: React.ChangeEvent<HTMLInputElement>){

        try{
            this.upNumber=Number(event.target.value.toString());
            console.log("up is "+this.upNumber);
        }catch(error){
            message.error("参考水量上限必须输入有效数字"); 
            this.upFlag=false;
            return;
        }
        if (isNaN(this.upNumber)) {
            message.error("参考水量上限必须输入有效数字");
            this.upFlag=false;

            return;
        }
        if (this.upNumber<0) {
            message.error("参考水量上限只允许输入大于0的正数");
            this.upFlag=false;
            return;
        }
        console.log("upNumber is "+this.upNumber);
        this.upFlag=true;
        this.ReferQuantityUp = event.target.value.toString();
        this.props.copyMeterParamDoMainStore!.QuantityParamDto.ReferQuantityUp = event.target.value.toString(); // 触发渲染
    }

    /**
     * 参考水量下限改变事件
     * @param value 
     */
    public ReferQuantityDownOnChange(event: React.ChangeEvent<HTMLInputElement>){
        try{
            this.downNumber=Number(event.target.value.toString());
        }catch(error){
            message.error("参考水量下限必须输入有效数字");
            this.downFlag = false;
            return;
        }
        if (isNaN(this.downNumber)) {
            message.error("参考水量下限必须输入有效数字");
            this.downFlag = false;

            return;
        }
        if (this.downNumber<0) {
            message.error("参考水量下限只允许输入大于0的正数");
            this.downFlag = false;

            return;
        }
        console.log("downNumber is "+this.downNumber);
        this.downFlag = true;

        this.ReferQuantityDown = event.target.value.toString();
        this.props.copyMeterParamDoMainStore!.QuantityParamDto.ReferQuantityDown = event.target.value.toString(); // 触发渲染
    }

    /**
     * 加载数据
     */
    public async loadData(){
        this.quantityParamDtoLoading = true;
        const copyMeterParamRes = await this.props.copyMeterParamDoMainStore!.GetCopyMeterParam();
        if(copyMeterParamRes.rtnCode!==0){
            message.error(copyMeterParamRes.rtnMsg);
            this.quantityParamDtoLoading = false;
            return;
        }

        const copyMeterParamDto = copyMeterParamRes.data as CopyMeterParamDto;
        const quantityParam = copyMeterParamDto.QuantityCompare as QuantityCompareParamEntity;
        this.props.copyMeterParamDoMainStore!.QuantityParamDto = quantityParam;
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos = quantityParam;
        console.log("this.props.copyMeterParamDoMainStore!.QuantityParamDto.QuantityCompareIsEnable is "+this.props.copyMeterParamDoMainStore!.QuantityParamDto.QuantityCompareIsEnable);
        this.props.copyMeterParamDoMainStore!.AlarmQuantityIndex = quantityParam.AlarmQuantity;
        this.AlarmQuantity = quantityParam.AlarmQuantity;
        this.QuantityParamEnable = quantityParam.QuantityCompareIsEnable;
        this.ReferQuantityUp = quantityParam.ReferQuantityUp;
        this.ReferQuantityDown = quantityParam.ReferQuantityDown;
        this.IsCanChangeAfterCopid = quantityParam.IsCanChangeAfterCopid;
        this.IsCopyAddOne = quantityParam.IsCopyAddOne;
        this.quantityParamDtoLoading = false;
    }

    /**
     * 保存抄表参数数据
     */
    public async save(){
        if(!this.upFlag||!this.downFlag){
            return;
        }
        if(this.upNumber<this.downNumber){
            message.info("参考水量上限不能小于下限");
            return;
        }
        const entity = new CopyMeterParamDto();
        const quantityEntity = new QuantityCompareParamEntity();
        quantityEntity.QuantityCompareIsEnable = this.QuantityParamEnable;
        quantityEntity.AlarmQuantity = this.AlarmQuantity;
        quantityEntity.ReferQuantityUp = this.ReferQuantityUp;
        quantityEntity.ReferQuantityDown = this.ReferQuantityDown;
        quantityEntity.IsCanChangeAfterCopid = this.IsCanChangeAfterCopid;
        quantityEntity.IsCopyAddOne = this.IsCopyAddOne;
        entity.QuantityCompare = quantityEntity;
        if(String(this.props.copyMeterParamDoMainStore!.QuantityParamDtos.IsCopyAddOne)===String(entity.QuantityCompare.IsCopyAddOne)&&String(this.props.copyMeterParamDoMainStore!.QuantityParamDtos.IsCanChangeAfterCopid)===String(entity.QuantityCompare.IsCanChangeAfterCopid)&&String(this.props.copyMeterParamDoMainStore!.QuantityParamDtos.AlarmQuantity)===String(entity.QuantityCompare.AlarmQuantity)&&String(this.props.copyMeterParamDoMainStore!.QuantityParamDtos.QuantityCompareIsEnable)===String(entity.QuantityCompare.QuantityCompareIsEnable)&&String(this.props.copyMeterParamDoMainStore!.QuantityParamDtos.ReferQuantityUp)===String(entity.QuantityCompare.ReferQuantityUp)&&String(this.props.copyMeterParamDoMainStore!.QuantityParamDtos.ReferQuantityDown)===String(entity.QuantityCompare.ReferQuantityDown)){
            message.info("暂无需要保存的数据");
            return
        }
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos.QuantityCompareIsEnable = entity.QuantityCompare.QuantityCompareIsEnable;
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos.AlarmQuantity = entity.QuantityCompare.AlarmQuantity;
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos.ReferQuantityUp = entity.QuantityCompare.ReferQuantityUp;
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos.ReferQuantityDown = entity.QuantityCompare.ReferQuantityDown;
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos.IsCopyAddOne = entity.QuantityCompare.IsCopyAddOne;
        this.props.copyMeterParamDoMainStore!.QuantityParamDtos.IsCanChangeAfterCopid = entity.QuantityCompare.IsCanChangeAfterCopid;
        const res = await this.props.copyMeterParamDoMainStore!.Update(entity);
        if (res.rtnCode!==0) {
            message.error(res.rtnMsg);
            return;
        }
        message.success("保存成功");
    }
}