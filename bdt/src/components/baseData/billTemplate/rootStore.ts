import { BillTemplateCardStore } from "./card/store";
import { BillTemplateLayoutStore } from "./layout/store";
import { BillTemplateModalStore } from "./modal/store";

/**
 * 票据模板根store
 */
export class BillTemplateRootStore {
    /**
     * 票据模板弹窗store
     */
    public BillTemplateModalStore: BillTemplateModalStore;
    /**
     * 票据模板模板块store
     */
    public BillTemplateCardUiStore: BillTemplateCardStore;
    /**
     * layout store
     */
    public BillTemplateLayoutStore: BillTemplateLayoutStore

    constructor() {
        console.log("BillTemplateRootStore___constructor")
        this.BillTemplateLayoutStore = new BillTemplateLayoutStore(this);
        this.BillTemplateModalStore = new BillTemplateModalStore(this);
        this.BillTemplateCardUiStore = new BillTemplateCardStore(this);
    }

    
}
 
const RootStore = new BillTemplateRootStore();
const store = {
    BillTemplateRootStore: RootStore,
    BillTemplateLayoutStore: RootStore.BillTemplateLayoutStore,
    BillTemplateCardUiStore: RootStore.BillTemplateCardUiStore,
    BillTemplateModalStore: RootStore.BillTemplateModalStore
}
export default store;