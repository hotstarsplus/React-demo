import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import { CompanyDrawerDomainStore } from "../domainStore";



export interface ICpDeptTreeProps{

    GlobalCompanyDrawerDomainStore?:CompanyDrawerDomainStore;

    onSelect?:(selectedKeys: string[], e: AntTreeNodeSelectedEvent)=>void;

}