import { action } from 'mobx';
import { IProductItemTableViewProps } from './interface';
/**
 * 水费项目列表视图action
 */
export class ProductItemTableViewUiAction {

    private props: IProductItemTableViewProps;



    constructor(props: IProductItemTableViewProps) {
        this.props = props;
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this);
    }


    /**
     * 点击删除按钮的回调方法
     * @param e 点击事件对象
     */
    public async deleteClick(id: string) {
        this.props.onDelete(id);

    }

    /**
     * 点击编辑按钮的回调方法
     * @param e 
     */
    @action
    public editClick(id: string) {


        this.props.onEdit(id);

    }
 
}