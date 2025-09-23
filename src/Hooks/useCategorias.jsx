import { useState } from 'react'
import { getCategorias as getCategoriasApi, updateCategory, createCategory, deleteCategory } from '../axios/categorias'
import { getLocalStorage } from '../shared/storage'

export const useCategorias = () => {
    const [ loading, setLoading ] = useState(true)
    const [ categorias, setCategorias ] = useState([])
    const [ status, setStatus ] = useState({code: 0, err: null})


    const listarCategorias = async () => {
        try{
            setLoading(true)
            const response = await getCategoriasApi()
            setCategorias(response)
            setStatus({code: 200, message: 'ok'})
        }catch(err){
            setStatus({code: err.code, message: err.message})
        }finally{
            setLoading(false)
        }
    }
    
    const nuevaCategoria = async (category) => {
        try{
            setLoading(true)
            const response = await createCategory(category, getLocalStorage('token'))
            setStatus({code: response.code, err: 'ok'})
        }catch(err){
            setStatus({code: err.code, message: err.message})
        }finally{
            setLoading(false)
        }
    }

    const actualizarCategorias = async (category) => {
        try{
            setLoading(true)
            const response = await updateCategory(category, getLocalStorage('token'))
            setStatus({code: response.code, err: 'ok'})
        }catch(err){
            setStatus({code: err.code, message: err.message})
        }finally{
            setLoading(false)
        }
    }

    const eliminarCategorias = async (id) => {
        try{
            setLoading(true)
            const response = await deleteCategory(id, getLocalStorage('token'))
            setStatus({code: response.code, err: 'ok'})
        }catch(err){
            setStatus({code: err.code, message: err.message})
        }finally{
            setLoading(false)
        }
    }

    return {
        loading,
        status,
        categorias,
        listarCategorias,
        actualizarCategorias,
        eliminarCategorias,
        nuevaCategoria
    }

}
