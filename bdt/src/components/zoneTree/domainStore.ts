import { action } from "mobx";
import { IResponseJsonResult, requestJson } from "orid";

export class ZoneTreeDomainStore {

    @action
    /** 获取小区树 */
    public GetGardenTree = async (Organization: string): Promise<IResponseJsonResult> => {
        try {
            return await requestJson("/api/bdt/Garden/GetGardenTreeByCodeAndUser/" + Organization);
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }
    /** 获取营业网点 */
    @action
    public GetBusinessOff = async (Organization: string) => {
        try {
            return await requestJson("/api/bdt/BusinessOffice/List/All?cpCode=" + Organization + '&searchCase=' + '');
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }

    /** 获取用水性质 */
    @action
    public GetWaterKind = async (Organization: string) => {
        try {
            return await requestJson("/api/bdt/ProductKind/TreeList/1?cpCode=" + Organization);
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }
    /** 获取用户类型 */
    @action
    public GetUserKind = async (Organization: string) => {
        try {
            return await requestJson(`/api/bdt/UserCategory/GetUserCategoryTreeByCodeAndUser/${Organization}`);
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }

    /** 获取供水所 */
    @action
    public GetWaterStation = async (Organization: string) => {
        try {
            return await requestJson(`api/bdt/WaterStation/GetWaterStationTreeByCodeAndUser/${Organization}`);
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }


    /** 获取区段树 */
    @action
    public GetRegionTree = (selectType: string) => {
        return async (Organization: string) => {
            try {
                if (selectType === '区段') {
                    return await requestJson("/api/bdt/Region/GetRegionTreeByCodeAndUser/" + Organization);
                } else if (selectType === '小区') {
                    return await requestJson("/api/bdt/Garden/GetGardenTreeByCodeAndUser/" + Organization);
                } else if (selectType === '用水性质') {
                    return await requestJson("/api/bdt/ProductKind/TreeList/1?cpCode=" + Organization);
                } else if (selectType === '用户类型') {
                    return await requestJson(`/api/bdt/UserCategory/GetUserCategoryTreeByCodeAndUser/${Organization}`);
                } else if (selectType === '供水所') {
                    return await requestJson(`api/bdt/WaterStation/GetWaterStationTreeByCodeAndUser/${Organization}`);
                } else {
                    return await requestJson("/api/bdt/BusinessOffice/List/All?cpCode=" + Organization + '&searchCase=' + '');
                }
            } catch (e) {
                return {
                    rtnCode: -1,
                    rtnMsg: "查询异常!"
                }
            }
        }
    }

    /** 获取页面样式 */
    @action
    public getUIType = async (pageCode: string) => {
        console.log("1-获取页面样式", pageCode)
        try {
            return await requestJson("/api/bdt/UiLayerStyle/GetMenuUiLayerStyle?menuId=" + pageCode);
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }

    /** 获取页面样式 */
    @action
    public getOrganization = async () => {
        try {
            return await requestJson("/api/sys/Organization/organizationtree");
        } catch (e) {
            return {
                rtnCode: -1,
                rtnMsg: "查询异常!"
            }
        }
    }

}