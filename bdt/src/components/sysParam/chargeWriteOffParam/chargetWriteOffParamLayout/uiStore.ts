import { observable } from "mobx";

export class ChargeWriteOffParamUiStore{
    
    @observable
    public autoWriteOff: boolean | undefined = undefined;

    @observable
    public dateType: '每周' | '每月' | '每天' | undefined = undefined;

}