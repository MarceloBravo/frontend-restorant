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

export const getCategoria = async (id) => {
    try{
        const resp = await axios.get(host+ '/api/categories/'+id);
        return resp.data;
    }catch(err){
        console.log(err);
        return [];
    }
}


export const updateCategory = async (category, token) => {
    try {
        const formData = new FormData();
        for (const key in category) {
            if (category[key] !== null && category[key] !== undefined) {
                formData.append(key, category[key]);
            }
        }

        // If the image is a string (URL), it should not be sent as we are using FormData now.
        // The backend will interpret it as a file upload attempt.
        // Only file objects should be sent.
        if (typeof category.image === 'string') {
            formData.delete('image');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const resp = await axios.patch(`${host}/api/categories/${category.id}/`, formData, config);
        return resp.data;
    } catch (err) {
        console.error('Error updating category:', err.response?.data || err.message);
        throw err;
    }
}


export const deleteCategory = async (id, token) => {
    try{
        const config = { headers: { Authorization: `Bearer ${token}` }};
        const resp = await axios.delete(host+ `/api/categories/${id}/`, config);
        return resp.data;
    }catch(err){
        console.log(err);
        return null;
    }
}


export const createCategory = async (category, token) => {
    try {
        const formData = new FormData();
        for (const key in category) {
            if (category[key] !== null && category[key] !== undefined) {
                formData.append(key, category[key]);
            }
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const resp = await axios.post(`${host}/api/categories/`, formData, config);
        return resp.data;
    } catch (err) {
        console.error('Error creating category:', err.response?.data || err.message);
        throw err;
    }
}

export const uploadCategoryImage = async (imageFile, token) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        };

        const resp = await axios.post(host + '/api/categories/upload/', formData, config);
        return resp.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}