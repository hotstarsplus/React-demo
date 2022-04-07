import { PrintTemplateDomainStore } from "./domainStore";
import { PrintTemplateUiStore } from "./uiStore";

const store = {
    PrintTemplateUiStore: new PrintTemplateUiStore(),
    PrintTemplateDomainStore: new PrintTemplateDomainStore(),
}
export default store;