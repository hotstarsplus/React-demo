import { IResponseJsonResult, requestJson } from "orid";
import { ProductKind } from "./entity";


class ProductKindDomainStoreC {


    public async GetListByBusinessType(typeId: number | string, cpcode: string, flag: boolean){

        if (flag) {
            return await requestJson("/api/bdt/ProductKind/List?cpCode=" + cpcode,
                {
                    method: "GET"
                }
            );
        } else {
            return await requestJson("/api/bdt/ProductKind/TreeList/" + typeId + '?cpCode=' + cpcode,
                {
                    method: "GET"
                }
            )
        }

    }

    /**
     * 增加用水性质
     * @param model 用水性质实体类
     */
    public async AddProductKind(model: ProductKind): Promise<IResponseJsonResult> {

        const res = await requestJson("api/bdt/ProductKind/Add",
            {
                body: JSON.stringify(model),
                method: "POST",
                headers: { "content-type": "application/json" }
            }
        )

        return res;

    }




    public async Delete(model: ProductKind, cpcode: string): Promise<IResponseJsonResult> {

        const res = await requestJson("/api/bdt/ProductKind/Delete/" + model.ProductKindId + '?CpCode=' + cpcode, {
            method: "POST",
            headers: { "content-type": "application/json" }
        });

        return res;

    }


    /**
     * 更新产品性质
     * @param model 用水性质实体类
     */
    public async UpdateProductKind(model: ProductKind): Promise<IResponseJsonResult> {



        const res = await requestJson("/api/bdt/ProductKind/Update", {
            body: JSON.stringify(model),
            method: "POST",
            headers: { "content-type": "application/json" }
        });



        return res;


    }

}

export const ProductKindDomainStore = new ProductKindDomainStoreC();
