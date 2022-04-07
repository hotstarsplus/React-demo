import { message, notification } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SelectValue } from 'antd/lib/select';
import { PreSaveWriteOffParamEntity } from "../../../entity/PreSaveWriteOffParamEntity";
import { ChargeWriteOffDoMainStore } from '../../domainStore';
import { ChargeWriteOffParamUiStore } from '../uiStore';
import { IChargeWriteOffParamForm } from './ui';

class ChargeWriteOffParamFormAction {

    public props: IChargeWriteOffParamForm;

    public uiStore: ChargeWriteOffParamUiStore;

    public constructor(props: IChargeWriteOffParamForm) {
        this.props = props;
        this.uiStore = props.ChargeWriteOffParamUiStore!;
    }

    public getInitParam = (param: PreSaveWriteOffParamEntity) => {
        if (this.uiStore.dateType === undefined) {
            this.uiStore.autoWriteOff = param.AutoWriteOff;

            this.uiStore.dateType = param.WriteOffDate.DateType;

        }
    }

    public onSave = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                const param: PreSaveWriteOffParamEntity = {
                    WriteOffType: values.WriteOffType,
                    AutoWriteOff: values.AutoWriteOff,
                    WriteOffDate: {
                        SelectType: values.TimeType,
                        Time: values.SingleTime,
                        DateType: values.DateType,
                        StartTime: values.StartTime,
                        EndTime: values.EndTime,
                        WriteOffTime: (values.WriteOffTime as moment.Moment).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
                this.props.onSave(param)
            }
        })
    }

    public PrePayNow = () => {
        ChargeWriteOffDoMainStore.PrePayNow().then((res) => {
            message[(res.rtnCode !== 0) ? 'error' : 'success'](res.rtnMsg);
            if (res.rtnCode === 0) {
                this.QueryProcessStatus(res.data)
            }
        })
    }

    public onAutoWriteOffChange = (e: CheckboxChangeEvent) => {
        this.uiStore.autoWriteOff = e.target.checked
    }


    public onTypeChange = (value: SelectValue) => {
        this.uiStore.dateType = value as any
    }


    /** 查询销账状态 */
    public QueryProcessStatus = (id: string) => {
        const timer = setInterval(async () => {
            ChargeWriteOffDoMainStore.QueryProgress(id).then((searchRes) => {
                if (searchRes.rtnCode !== 404) {
                    clearInterval(timer);
                    switch (searchRes.rtnCode) {
                        case 0:
                            notification.success({
                                description: searchRes.rtnMsg,
                                duration: 0,
                                message: `操作成功`,
                            });
                            break;
                        case 1:
                            notification.info({
                                description: searchRes.rtnMsg,
                                duration: 0,
                                message: `提示信息`,
                            });
                            break;
                        case 2:
                            notification.error({
                                description: searchRes.rtnMsg,
                                duration: 0,
                                message: `操作失败`,
                            });
                            break;
                    }
                }
            })
        }, 1000);
    }
}

export { ChargeWriteOffParamFormAction };

