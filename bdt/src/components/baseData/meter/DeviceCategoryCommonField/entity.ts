import { observable } from "mobx";

export interface IDeviceCategoryCommonField{

    FieldId:number;

    CategoryId:string;

    FieldCnName:string;

}

export class DeviceCategoryCommonField implements IDeviceCategoryCommonField{
    @observable
    public FieldId: number;    
    @observable
    public CategoryId: string;
    @observable
    public FieldCnName: string;

    constructor(){
        this.FieldId=0;
        this.CategoryId="";
        this.FieldCnName="";
    }

}