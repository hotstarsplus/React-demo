import { action ,observable} from "mobx";
import { NeighborhoodDoMainStore } from "./domainStore";
import { Neighborhood } from "./entity";
import { INeighborhoodListViewProps } from "./interface";

export class NeighborhoodLisViewUiAction{

    /**
     * 是否显示编辑视图
     */
    @observable
    public isVisiableModal:boolean;
    /**
     * 对话框标题内容
     */
    @observable
    public modaltitle :string ="";

    public props:INeighborhoodListViewProps;
 
    /**
     * 当前操作类型
     */
    public opearatorType:"none"|"add"|"edit";

    private domainStore:NeighborhoodDoMainStore;



    /**
     * 构造
     * @param props 
     */
    constructor(props:INeighborhoodListViewProps){

        this.domainStore = props.GlobalNeighborhoodStore!;

        this.addbtn = this.addbtn.bind(this);

        this.adda = this.adda.bind(this);

        this.cancel = this.cancel.bind(this);

        this.edit = this.edit.bind(this);

        this.save = this.save.bind(this);

        this.props=props;
        
        
    }
    
    /**
     * 新增按钮点击
     * @param model 实体类
     */
    @action
    public async addbtn(){
        
        this.domainStore.CurrentEditNeighborhood = new Neighborhood();

        this.domainStore.CurrentEditNeighborhood.FatherId = ""

        this.opearatorType="add";
        this.modaltitle = "新增缴费网点";
        
        this.domainStore.SelectorDisabled = false;

        await this.props.GlobalNeighborhoodStore!.LoadData();

        this.domainStore.CurrentEditNeighborhood.SortNo = await this.props.GlobalNeighborhoodStore!.getMaxSortNo('');

        this.isVisiableModal = true;

    }
    
    /**
     * 新增<a>点击
     * @param model 实体类
     */
    @action
    public adda(model:Neighborhood){
        this.modaltitle = "新增缴费网点";

        this.isVisiableModal = true;

        this.opearatorType = "add";
        
        this.domainStore.CurrentEditNeighborhood = new Neighborhood();

        this.domainStore.CurrentEditNeighborhood.FatherId = model.NeighborhoodId;

        this.domainStore.SelectorDisabled = true;

    }

    /**
     * 编辑
     */
    @action
    public edit(){
        this.modaltitle = "编辑缴费网点";

        this.isVisiableModal = true;

        this.opearatorType = "edit";

        this.domainStore.SelectorDisabled = true;

    }

    /**
     * 取消
     */
    @action
    public cancel(){
        this.isVisiableModal = false;
        this.opearatorType = "none";
    }

   /**
    * 保存
    * @param model 实体类
    */
    @action
    public save(model:Neighborhood){

        if (this.opearatorType==="add") {
            const index = model.FatherId.indexOf('_');
            if(index>0){
                model.FatherId=model.FatherId.substring(0,index);
            }
            this.domainStore.AddNeighborhood(model);
        }else if (this.opearatorType==="edit") {
            const index = model.FatherId.indexOf('_');
            if(index>0){
                model.FatherId=model.FatherId.substring(index+1,model.FatherId.length)
            }
            this.domainStore.UpdateNeighborhood(model);
        }
        this.isVisiableModal = false;
    }

    /**
     * 获取回到顶部组件侦听的元素
     */
    public backTopTarget = (): any => {
        return document.getElementsByClassName('ant-tabs-content ant-tabs-content-no-animated')[0];
    }

}