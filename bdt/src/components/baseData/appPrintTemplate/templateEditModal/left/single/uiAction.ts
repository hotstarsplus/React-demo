import { action } from "mobx";
import { BrowseModal, IBrowseModal } from ".";
import { ModuleField } from "../../../entity";

export class LeftSingleUiAction {

    public props: IBrowseModal;

    public self: BrowseModal;

    public value: string

    public constructor(props: IBrowseModal, self: BrowseModal) {
        this.props = props;
    }

    @action.bound
    public replaceData(item: ModuleField) {
        let result: string = item.FieldValue;
        const sourceName = this.props.loopString(item.FieldValue);
        if(item.DataSource){
            item.DataSource.map((source) => {
                if (sourceName.includes(source.CnName)) {
                    result = result.split('[' + source.CnName + ']').join(source.DisplayValue);
                }
            })
        }

        return result
    }

    public refresh() {
        this.self.setState({})
    }

}