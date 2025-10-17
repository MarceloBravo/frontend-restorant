import { ProductoClass } from "../class/ProductoClass";
import { CategoryClass } from "../class/CategoryClass";

export interface ProductoFormHtmlInterface {
    formData: ProductoClass;
    imageUrl: string | null;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    id?: number | null;
    categorias: CategoryClass[];
    errors: { [key: string]: string };
    handlerInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImageUploadClick: () => void;
    handlerGrabarClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handlerEliminarClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handlerCancelarClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}