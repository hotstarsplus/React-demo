import {observable} from 'mobx';

/**
 * 抄见状态接口
 */
export interface IStateWriteOff{

    id: string,
    writeOffStateName: string,
    description: string,
}

/**
 * 抄见状态
 */
export class StateWriteOff implements IStateWriteOff{

    /**
     * 抄见状态id
     */
    @observable
    public id : string; 

    /**
     * 抄见状态名称
     */
    @observable
    public writeOffStateName : string;


    /**
     * 备注
     */
    @observable
    public description : string;


    /**
     * 
     * @param id 抄见状态id
     * @param name 抄见状态名称
     * @param des 备注
     */
    constructor(id:string = '',name:string='',des=''){

        this.id = id;
        this.writeOffStateName = name;
        this.description = des;
    }
}
