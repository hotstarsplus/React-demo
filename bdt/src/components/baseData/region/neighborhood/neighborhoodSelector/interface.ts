import {NeighborhoodDoMainStore} from '../domainStore'


export interface INeighborhoodTreeSelectProps{

    /**
     * 数据源
     */
    list?:any;

    /**
     * 改变事件
     */
    onChange?:(value: any, label: any) => void;

    /**
     * 当前选择项
     */
    value?: any;

    key?:any;

    FatherId?:any;

    /**
     * 是否禁用
     */
    disabled?:boolean;

    /***
     * 选中事件
     */
    onSelect?:(fatherId:string)=>void;

    GlobalNeighborhoodStore?:NeighborhoodDoMainStore
    /**
     * 设置树结构字段值
     */
    setFieldsValue?:(obj: object)=>void;




}