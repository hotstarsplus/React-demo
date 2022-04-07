import { observable } from "mobx";

export interface IHeatState{
    HeatingStateId:string;
    HeatingStateName:string;
    Description:string 
}

export class HeatState implements IHeatState{ 
    @observable
    public HeatingStateId:string;

    @observable
    public HeatingStateName:string;

    @observable
    public Description:string;
    @observable
    public CpCode?:string=''
    /**
     * 
     * @param {string} id 供暖类型Id
     * @param {string} name 供暖类型名称
     * @param {string} Des  描述说明
     */
    constructor(id: string ="",name: string="",Des: string=""){
        this.HeatingStateId = id;
        this.HeatingStateName = name;
        this.Description=Des;
    }
}