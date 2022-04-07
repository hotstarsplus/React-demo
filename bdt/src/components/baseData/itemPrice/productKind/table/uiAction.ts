import { IProductKindTableProps } from "./interface";




export class ProductKindTableUiAction {

    private props: IProductKindTableProps;

    constructor(props: IProductKindTableProps) {
        this.props = props;
        this.DeleteClick = this.DeleteClick.bind(this);
        this.EditClick = this.EditClick.bind(this);
    }


    /**
     * 编辑事件
     * @param e 
     */
    public async EditClick(id: string) {


        this.props.onEdit(id);


    }

    /**
     * 删除事件
     * @param e 
     */
    public async DeleteClick(productKindId: string) {

        this.props.onDelete(productKindId)

    }



}