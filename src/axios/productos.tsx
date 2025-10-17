import axios from "axios"
import { ProductoClass } from "../class/ProductoClass";
const host = process.env.REACT_APP_BACKEND_URL;

export const getProductById = (id: number): Promise<any> => {
    return axios.get(host + '/api/products/' + id + '/');
}


export const getProducts = (searchTerm: string = ''): Promise<any> => {
    let options = {};
    if (searchTerm) {
        options = { params: { search: searchTerm } };
    }
    console.log('----------------',host + '/api/products/', options);
    return axios.get(host + '/api/products/', options);
}


export const createProduct = async (product: ProductoClass, token: string): Promise<any> => {
    const {formData, config} = configData(product, token);
    return axios.post(host + '/api/products/', formData, config);
}


export const updateProduct = async (product: any, token: string): Promise<any> => {
    const {formData, config} = configData(product, token);
    return axios.put(host + '/api/products/' + product.id + '/', formData, config);
}


export const deleteProduct = async (id: number, token: string) => {
    const {config} = configData(null, token);
    return axios.delete(host + '/api/products/' + id + '/', config);
}


const configData = (data: ProductoClass | any, token: string): {formData: FormData, config: any} => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+token.replace(/^"(.*)"$/, '$1')
        }
    }
    const formData = new FormData();
    for(const key in data){
        if (data[key] === undefined || data[key] === null) {
            continue;
        }

        if (key === 'image') {
            if (data[key] instanceof File) {
                formData.append('image', data[key]);
            }
        } else if (key === 'category') {
            formData.append('category', (data[key]).toString());
        } else {
            formData.append(key, data[key]);
        }
    }
    return {formData, config};
}