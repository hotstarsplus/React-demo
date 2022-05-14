import { message } from "antd";
import { IKnowledgeBasePopUpForm } from "./ui";

export class KnowledgeBasePopUpFormUiAction {

    public props: IKnowledgeBasePopUpForm;

    public constructor(props: IKnowledgeBasePopUpForm) {
        this.props = props;
    }

    public handleOk = () =>{
        console.log("点击保存确认按钮");
        this.props.form.validateFields((err,value)=>{
            if (err) {
                message.info('请完善必填项信息')
                return
            } else {
                /** 拿到存储信息 */
                console.log("保存知识库设置",value)

                const body={
                    AutoId: this.props.uiStore.editData.AutoId,
                    Id: this.props.uiStore.editData.Id,
                    KnowledgeTypeId: value.KnowledgeTypeId,
                    Title: value.Title,
                    ShortContent: '',
                    Content: value.Content,
                    KnowledgeTag: value.KnowledgeTag,
                    ShortTitle: '',
                    Source: '',
                    // WriteDate: 2022-05-12T06:23:17.931Z,
                    Author: '',
                    Remark: value.Remark,
                    // CreateDate: 2022-05-12T06:23:17.931Z,
                    IsHot: value.IsHot,
                    CreaterId: '',
                    // UpdateDate: 2022-05-12T06:23:17.931Z,
                    UpdaterId: '',
                    KnowledgeTypeName: ''
                }

                if(this.props.uiStore.popUpFormType === 'add'){
                    console.log("新增知识库数据")

                    this.props.domainStore.addKnowledgeBaseTableData(body).then((res) => {
                        try {
                            if (res.rtnCode === 0) {

                                message.success("添加成功！");
                                this.props.uiStore.editVisible = false;
                                /** 更新数据 */
                                this.props.getdata();

                            } else {
                                message.error(res.rtnMsg);
                            }
                        }
                        catch (error) {
                            console.log("error:", error);
                            message.error(error);
                        }

                    })

                }
                if(this.props.uiStore.popUpFormType === 'edit'){
                    console.log("更新知识库数据")

                    this.props.domainStore.UpdataKnowledgeBaseTableData(body).then((res) => {
                        try {
                            if (res.rtnCode === 0) {

                                message.success("添加成功！");
                                this.props.uiStore.editVisible = false;
                                /** 更新数据 */
                                this.props.getdata();

                            } else {
                                message.error(res.rtnMsg);
                            }
                        }
                        catch (error) {
                            console.log("error:", error);
                            message.error(error);
                        }

                    })

                }
            }
        })
    }

    public handleCancel = () =>{
        console.log("点击取消按钮");
        this.props.uiStore.editVisible = false;
    }
}