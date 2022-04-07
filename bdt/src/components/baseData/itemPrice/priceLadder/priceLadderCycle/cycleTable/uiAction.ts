import { message } from 'antd';
import { action, observable } from 'mobx';
import { requestJson } from 'orid';
import { LadderCycleEntity } from '../../entity';
import { PriceLadderUiStore } from '../../uiStore';
import { LadderTypeFormUiAction } from '../ladderTypeForm/uiAction';
import { ICycleTableProps } from './interface';

export class CycleTableUiAction {
    @observable
    public TableCurrentEditEntity: LadderCycleEntity



    @observable
    public AddBiliDisible: boolean

    private uiStore: PriceLadderUiStore;

    private ladderTypeFormUiAction: LadderTypeFormUiAction;

    constructor(props: ICycleTableProps) {
        this.uiStore = props.GlobalLadderPriceUiStore!;
        this.TableCurrentEditEntity = new LadderCycleEntity();
        this.AddBiliDisible = false;
        this.OkHandler = this.OkHandler.bind(this);
        this.CancelHandler = this.CancelHandler.bind(this);
        this.RowEdit = this.RowEdit.bind(this);
        this.getFormUiAction = this.getFormUiAction.bind(this);
    }



    @action
    public getFormUiAction(uiAction: LadderTypeFormUiAction) {
        this.ladderTypeFormUiAction = uiAction;
    }

    @action
    public async OkHandler() {

        const validate = this.ladderTypeFormUiAction.validate();

        if (!validate.isValidated) {
            return;
        }
        const entity = new LadderCycleEntity();
        entity.LadderType = validate.formData.LadderType;
        entity.Proportion = validate.formData.Proportion;
        entity.WaterKindId = validate.formData.WaterKindId;
        entity.WaterKindName = validate.formData.WaterKindName;
        entity.CpCode = this.uiStore.CpCode;
        const res = await this.SaveCycle(entity);

        if (res !== 0) {
            return;
        }

        this.uiStore.ladderTypeModalVisible = false;

        this.uiStore.GetCycleListByWaterKindId(validate.formData.WaterKindId, this.uiStore.CpCode);

    }

    @action
    public CancelHandler() {
        this.uiStore.ladderTypeModalVisible = false;
    }


    @action
    public RowEdit(record: LadderCycleEntity) {
        this.uiStore.currentLadderTypeEntity = record;
        this.uiStore.modelType = '编辑'
        this.uiStore.ladderTypeModalVisible = true;
    }


    /**
     * 保存
     */
    public async SaveCycle(value: LadderCycleEntity): Promise<number> {

        try {

            this.uiStore.Loading = true;

            const res = await requestJson("/api/bdt/LadderPrice/UpdateLadderType",
                {
                    body: JSON.stringify(value),
                    method: "POST",
                    headers: { "content-type": "application/json" }
                }
            )

            if (res.rtnCode === 0) {

                message.success('保存成功');
                this.uiStore.Loading = false;
            }
            else {
                message.error(res.rtnMsg);
                this.uiStore.Loading = false;
            }
            return res.rtnCode;

        } catch (error) {
            console.log(error);
            this.uiStore.Loading = false;
            return -1
        }

    }

}