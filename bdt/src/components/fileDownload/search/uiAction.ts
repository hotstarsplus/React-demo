import { action } from "mobx";
import moment from 'moment';


class DownLoadFilesSearchAction{

    private props: {
        search: (obj: object)=> void;
    };

    public constructor(props: {
        search: (obj: object)=> void;
    }) {
        this.props = props;
    }

    @action.bound
    public onSearch(obj: {}) {
        this.props.search({
            module: obj["module"] || '',
            // feature: obj["feature"],
            operatorId: obj["operatorId"],
            startTime: obj["createTime"][0]? moment(obj["createTime"][0]).startOf("day").format("YYYY-MM-DD HH:mm:ss") : undefined,
            endTime: obj["createTime"][1]? moment(obj["createTime"][1]).endOf("day").format("YYYY-MM-DD HH:mm:ss"): undefined
        })
    }

} 

export { DownLoadFilesSearchAction };