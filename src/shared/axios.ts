/**
 * Prepara los encabezados para las solicitudes a la API.
 * @param token - El token de autenticación.
 * @returns El objeto de configuración de los encabezados.
 */
export const prepareHeaders = (token: string): any => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token.replace(/^"(.*)"$/, '$1')
        }
    };
    return config;
}