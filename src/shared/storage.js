/**
 * @file storage.js
 * @description Funciones de utilidad para interactuar con el almacenamiento local y de sesión del navegador.
 * @module shared/storage
 */

/**
 * Guarda un valor en el almacenamiento local.
 * @param {string} key - La clave bajo la cual se guardará el valor.
 * @param {*} value - El valor a guardar. Se convertirá a una cadena JSON.
 */
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value.replace(/^"|"$/g, '')))
}

/**
 * Obtiene un valor del almacenamiento local.
 * @param {string} key - La clave del valor a obtener.
 * @returns {*} El valor recuperado o `null` si no se encuentra.
 */
export const getLocalStorage = (key) => {
    const val = JSON.parse(localStorage.getItem(key))  
    return val ? val.replace(/^"|"$/g, '') : null
}

/**
 * Elimina un valor del almacenamiento local.
 * @param {string} key - La clave del valor a eliminar.
 */
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}

/**
 * Limpia todo el almacenamiento local.
 */
export const clearLocalStorage = () => {
    localStorage.clear()
}

/**
 * Guarda un valor en el almacenamiento de sesión.
 * @param {string} key - La clave bajo la cual se guardará el valor.
 * @param {*} value - El valor a guardar. Se convertirá a una cadena JSON.
 */
export const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value.replace(/^"|"$/g, '')))
}

/**
 * Obtiene un valor del almacenamiento de sesión.
 * @param {string} key - La clave del valor a obtener.
 * @returns {*} El valor recuperado o `null` si no se encuentra.
 */
export const getSessionStorage = (key) => {
    const val = JSON.parse(sessionStorage.getItem(key))  
    return val ? val.replace(/^"|"$/g, '') : null
}

/**
 * Elimina un valor del almacenamiento de sesión.
 * @param {string} key - La clave del valor a eliminar.
 */
export const removeSessionStorage = (key) => {
    sessionStorage.removeItem(key)
}

/**
 * Limpia todo el almacenamiento de sesión.
 */
export const clearSessionStorage = () => {
    sessionStorage.clear()
}