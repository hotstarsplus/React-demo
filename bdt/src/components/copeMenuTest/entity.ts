import { observable } from "mobx";

/**
 * 自定义用户实体接口 
 * 写接口限制数据类型，带?可不强制实现
 */
export interface ICopeMenu{

    /**
     * 自增Id
     */
    AutoId:number;

    /**
     * 用户号
     */
    UserId:string;

    /**
     * 用户名
     */
    UserName:string;

    /**
     * 父级Id
     */
    FatherId:string;

    /**
     * 性别
     */
    UserSex:string;

    /**
     * 地址
     */
    UserAddress:string;

    /**
     * 状态
     */
    UserState:string;

    /**
     * 联系方式
     */
    PhoneNumber:string;

}

/**
 * 仿制用户表实体
 * 自定义类继承接口，要实现接口中的实体类
 * 再抛出，既可引用
 */
export class CopeMenu implements ICopeMenu {
    
    /**
     * 自增Id
     */
    @observable
    public AutoId:number;
    
    /**
     * 用户号
     */
    @observable
    public UserId:string;
    
    /**
     * 用户名
     */
    @observable
    public UserName:string;
    
    /**
     * 父级Id
     */
    @observable
    public FatherId:string;
    
    /**
     * 性别
     */
    @observable
    public UserSex:string;
    
    /**
     * 地址
     */
    @observable
    public UserAddress:string;
    
    /**
     * 状态
     */
    @observable
    public UserState:string;
    
    /**
     * 联系方式
     */
    @observable
    public PhoneNumber:string;
    
    /**
     * 自定义类中创建构造函数,如不实例化则无用
     */
    constructor(){
        this.UserId = "";
        this.AutoId = 1;
        this.UserName = "";
        this.FatherId = "";
        this.UserSex = "";
        this.UserAddress = "";
        this.UserState = "";
        this.PhoneNumber = "";
    }
}
