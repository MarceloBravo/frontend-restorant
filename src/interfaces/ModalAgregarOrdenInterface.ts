import { OptionSelectInterface } from "./Components/OptionSelectInterface";

export interface ModalAgregarOrdenProps {
  title: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  optionsSelect: OptionSelectInterface[];
  setSelectedProducts: (options: any[]) => void;
}

export interface ModalAgregarOrdenInterface {
    isVisible: boolean;
    title: string,
    optionsSelect: OptionSelectInterface[],
    customStyles: any,
    selectedItems: OptionSelectInterface[],
    handleSelectChange: (optionSelected: OptionSelectInterface | null) => void,
    handleEliminarItem: (index: number) => void,
    handleAceptar: () => void,
    handleCancelar: () => void
  }