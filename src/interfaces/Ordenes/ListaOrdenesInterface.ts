import { UseQueryResult } from "@tanstack/react-query";
import { Ref } from "react";

export interface ListaOrdenesInterface {    
    listar: any, 
    searchTerm: string, 
    autoRefresh: boolean,
    refreshButton: Ref<HTMLDivElement | null>,
    isRefreshing: boolean,
    listarMesas: UseQueryResult<any, Error>,
    handleRefresh: () => void,
    handleAutoRefresh: () => void,
    handlerBtnNuevoClick: (e: any) => void, 
    handlerEditarClick: (id: number) => void, 
    handlerInputBuscarChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    handlerInputBuscarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void, 
    handlerEliminarClick: (id: number) => void, 
 }