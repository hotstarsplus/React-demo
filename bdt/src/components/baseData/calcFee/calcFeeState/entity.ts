import { observable } from "mobx";

/**
 * 计费状态接口
 */
export interface ICalcFeeState{
    id:string,
    calcFeeStateName:string,
}

/**
 * 计费状态
 */
export class CalcFeeState implements ICalcFeeState{

    /**
     * 计费状态ID
     */
    @observable
    public id:string;

    /**
     * 计费状态
     */
    @observable
    public calcFeeStateName:string;

    /**
     * 
     * @param id 计费状态Id
     * @param name 计费状态
     */
    constructor(id:string="",name:string=""){
        this.id = id;
        this.calcFeeStateName = name;
    }
}