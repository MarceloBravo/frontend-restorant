import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccessToken } from '../axios/login'
import { getLocalStorage } from '../shared/storage'
import { logOut } from '../store/slices/loginSlices'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../shared/storage'

export const useUser = () => {
    const accessToken = getLocalStorage('access')
    const refreshToken = getLocalStorage('refresh')
    const data = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(accessToken && refreshToken){
            dispatch(loginAccessToken(accessToken, refreshToken))
        }
    }, [accessToken, refreshToken, dispatch])

    useEffect(() => {
        if(data.isLogged === false){
            dispatch(logOut())
            clearLocalStorage()
            navigate('/admin/login')
        }
        // eslint-disable-next-line
    },[data])

    return data
}