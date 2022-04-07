import { ProductKindUiStore } from "../uiStore";




export interface IProductKindTableProps {

    ProductKindUiStore?: ProductKindUiStore;

    onEdit: (id: string) => void;

    onDelete: (id: string) => void;

}