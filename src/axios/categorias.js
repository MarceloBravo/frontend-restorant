import axios from 'axios'
const host = process.env.REACT_APP_BACKEND_URL;

export const getCategorias = async () => {
    try{
        const resp = await axios.get(host+ '/api/categories/');
        return resp.data;
    }catch(err){
        console.log(err);
        return [];
    }
}


export const updateCategory = async (category, token) => {
    try{
        const config = { headers: { Authorization: `Bearer ${token}` }};
        const resp = await axios.put(host+ `/api/categories/${category.id}/`, category, config);
        return resp.data;
    }catch(err){
        console.log(err);
        return null;
    }
}


export const deleteCategory = async (id, token) => {
    try{
        const config = { headers: { Authorization: `Bearer ${token}` }};
        const resp = await axios.delete(host+ `/api/categories/${category.id}/`, id, config);
        return resp.data;
    }catch(err){
        console.log(err);
        return null;
    }
}


export const createCategory = async (category, token) => {
    try{
        const config = { headers: { Authorization: `Bearer ${token}` }};
        const resp = await axios.post(host+ `/api/categories/`, category, config);
        return resp.data;
    }catch(err){
        console.log(err);
        return null;
    }
}
