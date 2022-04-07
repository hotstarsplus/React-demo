import {observable} from 'mobx';

export interface ICustomerState{
    CustomerStateId:number;
    CustomerStateName:string;
    Description:string;
}
export class CustomerState implements ICustomerState{
    @observable
    public CustomerStateId:number;

    @observable
    public CustomerStateName:string;

    @observable
    public Description:string;

    /**
     * 
     * @param {number} id 水卡类型Id
     * @param {string} name 水卡类型名称
     * @param {string} Des 描述说明
     */
    constructor(id: number = -1, name: string = '',Des:string = '') {
        this.CustomerStateId=id;
        this.CustomerStateName=name;
        this.Description=Des;
    }
}