import { createSlice } from "@reduxjs/toolkit";

const ModalSlices = createSlice({
    name: 'modal',
    initialState: {
        title: null, 
        isOpen: false, 
        message: null,
        btnAceptarText: 'Aceptar',
        btnCancelarText: 'Cancelar',
        isOkClicked: false
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.title = action.payload.title ?? null
            state.message = action.payload.message ?? 'Selecciona un opción'
            state.btnAceptarText = action.payload.btnAceptarText ?? 'Aceptar'
            state.btnCancelarText = action.payload.btnCancelarText ?? 'Cancelar'
            state.isOkClicked = false
        },
        closeModal: (state) => {
            state.isOpen = false
            state.title = null
            state.message = null
            state.btnAceptarText = 'Aceptar'
            state.btnCancelarText = 'Cancelar'
            state.isOkClicked = false
        },
        acpetarModal: (state) => {
            state.isOpen = false
            state.title = null
            state.message = null
            state.btnAceptarText = 'Aceptar'
            state.btnCancelarText = 'Cancelar'
            state.isOkClicked = true
        }
    }
})

export const { openModal, closeModal, acpetarModal } = ModalSlices.actions
export default ModalSlices.reducer;