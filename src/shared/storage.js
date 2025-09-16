export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value.replace(/^"|"$/g, '')))
}

export const getLocalStorage = (key) => {
    const val = JSON.parse(localStorage.getItem(key))  
    return val ? val.replace(/^"|"$/g, '') : null
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
    localStorage.clear()
}



export const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value.replace(/^"|"$/g, '')))
}

export const getSessionStorage = (key) => {
    const val = JSON.parse(sessionStorage.getItem(key))  
    return val ? val.replace(/^"|"$/g, '') : null
}

export const removeSessionStorage = (key) => {
    sessionStorage.removeItem(key)
}

export const clearSessionStorage = () => {
    sessionStorage.clear()
}

