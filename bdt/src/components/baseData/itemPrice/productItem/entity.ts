import { observable } from "mobx";

export class ProductItem{
    /**
     * 水费项目Id
     */
    @observable
    public ProductItemId: string;

    /**
     * 水费项目名称
     */
    @observable
    public ProductItemName: string;
    
    /**
     * 业务类型ID
     */
    public BusinessTypeId:number;


    /**
     * 业务类型名称
     */
    public BusinessTypeName:string;
    public CpCode:string=''

    /**
     * 
     * @param {string} id 水费项目Id
     * @param {string} name 水费项目名称
     */
    constructor(id: string = '', name: string = '') {
        this.ProductItemId = id;
        this.ProductItemName = name;
    }
}