import { action } from 'mobx';
import { IResponseJsonResult, requestJson } from 'orid';
import { ProductItem } from './entity';


/**
 * 水费项目Store.为WaterRateItemView所使用
 */
export class ProductItemDomainStore {


    /**
     * 新增项目
     * @param {ProductItem} item 项目
     */
    @action
    public async add(item: ProductItem): Promise<IResponseJsonResult> {

        const res = await requestJson("/api/bdt/ProductItem/Add", {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "content-type": "application/json" }
        });
        return res
    }



    /**
     * 加载数据
     * @param {(list:ProductItem[]) => void} fn 
     */
    @action
    public async GetListByBusinessType(typeId: number, cpCode: string, IsOrganization: boolean) {

        let res: IResponseJsonResult;
        if (IsOrganization) {
            res = await requestJson('/api/bdt/ProductItem/List?cpCode=' + cpCode, {
                method: "GET"
            });
            return res
        } else {
            res = await requestJson('/api/bdt/ProductItem/List/' + typeId + "?cpCode=" + cpCode, {
                method: "GET"
            });
            return res
        }


    }

    /**
     * 删除一个项目
     * @param {string} id 项目id
     */
    @action
    public async remove(id: string, cpcode: string): Promise<IResponseJsonResult> {

        const res = await requestJson("/api/bdt/ProductItem/Delete/" + id + '?cpCode=' + cpcode,
            {
                method: "POST",
                body: JSON.stringify(id),
                headers: { "content-type": "application/json" }

            });
        return res
    }



    /**
     * 更新一个项目
     * @param {ProductItem} item 项目
     * @returns {boolean} 成功返回True，否则返回false
     */
    @action
    public async update(item: ProductItem): Promise<IResponseJsonResult> {


        const res = await requestJson("/api/bdt/ProductItem/Update",
            {
                method: "POST",
                body: JSON.stringify(item),
                headers: { "content-type": "application/json" }
            }
        );
        return res
    }

}