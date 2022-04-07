import { action } from "mobx";
import { IResponseJsonResult, oridController, OridStores, requestJson } from "orid";
import { LateFeeParamEntity } from "../entity/lateFeeParam";
import { LateFeeParamSaveDto } from "../entity/lateFeeParamSaveDto";
import { SysParameter } from "../entity/sysParameter";
import { CalcLateFeeRule } from "./entity/calcLateFeeRule";

class LateFeeParamDoMainStore {

    /**
     * 保存违约金参数
     * @param list sysParmeter集合
     * @param lateFeeParm LateFeeParamEntity实体
     */
    @action
    public saveSysParam(list: SysParameter[], lateFeeParm: LateFeeParamEntity): Promise<IResponseJsonResult> {
        try {
            const saveDto = new LateFeeParamSaveDto();
            saveDto.SysParameters = list;
            saveDto.CpCode = OridStores.authStore.currentOperator.CpCode
            saveDto.LateFeeParam = lateFeeParm;
            saveDto.SysParameters[0].CpCode = OridStores.authStore.currentOperator.CpCode
    
            return requestJson("/api/bdt/SysParameter/saveLateFeeParam", {
                body: JSON.stringify(saveDto),
                headers: { "content-type": "application/json" },
                method: "POST",
            });
        }catch(error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
        
    }

    /**
     * 重新计算违约金
     */
    public CanelPenalty(): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/CalculateLateFeeByUserNo`, {
                body: JSON.stringify({
                    CpCode: OridStores.authStore.currentOperator.CpCode,
                    UserNoList: []
                }),
                headers: { "content-type": "application/json" },
                method: "POST",
            });

        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }

    /**
     * 查一下当前是否有正在计算的重新计算违约金功能
     */
    public CalculateLateFeeWait(): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/CalculateLateFeeWait?cpCode=${oridController.authController.getOperatorInfo().CpCode}`);

        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }
    /**
     * 获取违约金系统参数
     */
    public GetLaterFeeSysParams(): Promise<IResponseJsonResult> {
        try {
            return requestJson("/api/bdt/SysParameter/getLateFeeSysParams");
        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }

    /**
     * 获取规则列表
     */
    public GetLateFeeRules(): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/GetLateFeeRules?cpCode=${oridController.authController.getOperatorInfo().CpCode}`);
        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }

    /**
     * 新增规则接口
     */
    public AddLateFeeRule(rule: CalcLateFeeRule): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/AddLateFeeRule?cpCode=${oridController.authController.getOperatorInfo().CpCode}`, {
                body: JSON.stringify(rule),
                headers: { "content-type": "application/json" },
                method: "POST",
            });
        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }

    /**
     * 更新规则接口
     */
    public UpdateLateFeeRule(rule: CalcLateFeeRule): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/UpdateLateFeeRule?cpCode=${oridController.authController.getOperatorInfo().CpCode}`, {
                body: JSON.stringify(rule),
                headers: { "content-type": "application/json" },
                method: "POST",
            });
        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }

    /**
     * 更新排序号
     */
    public UpdateRuleSort(sortList: Array<{
        AutoId: number, SortNo: number
    }>): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/UpdateRuleSort?cpCode=${oridController.authController.getOperatorInfo().CpCode}`, {
                body: JSON.stringify(sortList),
                headers: { "content-type": "application/json" },
                method: "POST",
            });
        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }

    /** 
     * 获取用户类型数据---树级---多组织
     * 使用范围：1、客户管理的用户编辑；2、用户管理的用户编辑；3、开户；4、自定义开户
     * @param cpCode 企业代码
     */
    public async getUserCategoryTree(): Promise<IResponseJsonResult> {
        try {
        return await requestJson("/api/bdt/UserCategory/List/All?cpCode="+ oridController.authController.getOperatorInfo().CpCode, { method: "GET" });
        } catch (error) {
        return { rtnCode: -1100, rtnMsg: error.toString() }
        }
    }
    /**
     * 删除规则
     */
    public DelLateFeeRule(ruleId: number, ruleDetailId: number): Promise<IResponseJsonResult> {
        try {
            return requestJson(`/api/ccs/CalculateLateFee/DelLateFeeRule?ruleId=${ruleId}&ruleDetailId=${ruleDetailId}&cpCode=${oridController.authController.getOperatorInfo().CpCode}`);
        } catch (error) {
            return new Promise((r, j)=> {
                r( { rtnCode: 1, rtnMsg: error.toString() } );
            })
        }
    }



}

export { LateFeeParamDoMainStore };
