import {observable} from 'mobx';

export interface IStateMakeOutInvoice{
    id:string;
    invoiceStateName:string;
    description:string;

}
export class StateMakeOutInvoice{
    @observable
    public id:string;

    @observable
    public invoiceStateName:string;

    @observable
    public description:string

    constructor(id:string='',invoiceStateName:string='',des:string=''){
        this.id=id;
        this.invoiceStateName=invoiceStateName;
        this.description=des;
    }
}