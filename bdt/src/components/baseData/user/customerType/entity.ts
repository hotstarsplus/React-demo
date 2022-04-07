import {observable} from 'mobx';
/**
 * 用户自定义类型实体
 */

 export interface ICustomerTypeModel{
    AutoId:number;
    CustomerTypeId:string;
    CustomerTypeName:string;
    Description:string;
    IsDelete:boolean;

 }

 export class CustomerTypeModel implements ICustomerTypeModel{
     /**
      * 自增id
      */
     @observable
     public AutoId:number;

     /**
      * 用户类型编码
      */
     @observable
     public CustomerTypeId:string;

     /**
      * 用户类型名称
      */
     @observable
     public CustomerTypeName:string;

     /**
      * 描述
      */
     @observable
     public Description:string;

     /**
      * 是否删除
      */
     @observable
     public IsDelete:boolean;


    /**
     * 
     * @param autoId 自增id
     * @param typeId 用户类型编码
     * @param typeName 用户类型名称
     * @param des 描述
     * @param isdelete 是否删除
     */
    constructor(autoId:number=0,typeId:string="",typeName:string="",des:string="",isdelete:boolean=true){
        this.AutoId=autoId;
        this.CustomerTypeId=typeId;
        this.CustomerTypeName=typeName;
        this.Description=des;
        this.IsDelete=isdelete;
    }
 }