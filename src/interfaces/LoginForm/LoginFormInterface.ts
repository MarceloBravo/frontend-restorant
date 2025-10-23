export interface LoginFormInterface {
    formData: { 
        email: string,
        password: string
    },
    formError: {
        email?: string,
        password?: string
    },
    handlerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handlerButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void 
}