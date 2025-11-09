import { OptionSelectInterface } from '../../interfaces/Components/OptionSelectInterface';
import { useState } from 'react';
import { ModalAgregarOrdenInterface, ModalAgregarOrdenProps } from '../../interfaces/ModalAgregarOrdenInterface';
import './ModalAgregarOrden.scss'

export const useModalAgregarOrden = (props: ModalAgregarOrdenProps) : ModalAgregarOrdenInterface=> {
  const { title, isVisible, setIsVisible, optionsSelect, setSelectedProducts } = props;
  const [selectedItems, setSelectedItems] = useState<OptionSelectInterface[]>([]);

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      textAlign: 'left'
    }),
  };


  const handleSelectChange = (optionSelected: OptionSelectInterface | null): void => {
      if(!optionSelected) return;
      setSelectedItems([...selectedItems, optionSelected]);
   }

   const handleEliminarItem = (index: number): void => {
      const items = selectedItems.filter((_, i: number) => i !== index)
      setSelectedItems(items);
   }

   const handleCancelar = (): void =>{
     setSelectedProducts([])
     setSelectedItems([]);
     setIsVisible(false);
   }


   const handleAceptar = (): void =>{
    setSelectedProducts(selectedItems);
    setSelectedItems([]);
    setIsVisible(false);
   }

  return {
    isVisible,
    title,
    optionsSelect,
    customStyles,
    selectedItems,
    handleSelectChange,
    handleEliminarItem,
    handleAceptar,
    handleCancelar
  }
}