import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccessToken } from '../axios/login'
import { getLocalStorage } from '../shared/storage'
import { logOut } from '../store/slices/loginSlices'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../shared/storage'
import { isTokenExpired } from '../shared'

export const useUser = () => {
    const accessToken = getLocalStorage('access')
    const refreshToken = getLocalStorage('refresh')
    const interval = 5000
    const data = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(accessToken && refreshToken){
            dispatch(loginAccessToken(accessToken, refreshToken))
        }
    }, [accessToken, refreshToken, dispatch])


    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('Verificando token...'  )
            if(!accessToken || isTokenExpired(accessToken)){
                console.log('Token expirado')
                dispatch(logOut())
                clearLocalStorage()
                navigate('/admin/login')
                clearInterval(intervalId);
            }
        }, interval);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    },[]);
        

    return data
}