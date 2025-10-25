import { CategoryClass } from "../class/CategoryClass";

export interface CategoriasFormLogicInterface {
    id: string | null,
    formData: CategoryClass 
    imageUrl: string | null,
    fileInputRef: React.RefObject<HTMLInputElement | null>, 
    handlerInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleImageUploadClick: () => void,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handlerGrabarClick: () => void,
    handlerEliminarClick: () => void,
    handlerCancelarClick: () => void,
}