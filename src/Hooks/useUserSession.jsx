import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../shared/storage'
import { logOut } from '../store/slices/loginSlices'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../shared/storage'
import { isTokenExpired, parseJwt } from '../shared'
import { getUserById } from '../axios/users'

export const useUserSession = () => {
    const [ userData, setUserData ] = useState(null)
    const [ intervalId, setIntervalId ] = useState(null)
    const [ isUserlogued, setIsUserlogued] = useState(false)
    const [ userId, setUserId ] = useState(null)
    const accessToken = getLocalStorage('access')
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const interval = 5000

    useEffect(() => {
        if(!accessToken) finalizarSession()

        const tokenData = parseJwt(accessToken)
        if(tokenData?.user_id){
            setUserId(tokenData.user_id)
            dispatch(getUserById(tokenData.user_id, accessToken))
        }else{
            finalizarSession()
        }
        // eslint-disable-next-line
    },[])
    

    useEffect(()=> {
        if(user?.id === parseInt(userId)){
            setUserData(user)
        }
    }
    ,[user])

    useEffect(() => {
        const idInterval =setInterval(() => {
            console.log('Verificando token...'  )
            finalizarSession()
        }, interval);
        setIntervalId(idInterval)

        return () => clearInterval(idInterval);
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        finalizarSession()
        // eslint-disable-next-line
    },[isUserlogued])

    const finalizarSession = () => {
        if(!accessToken || isTokenExpired(accessToken)){
            dispatch(logOut())
            clearLocalStorage()
            navigate('/admin/login')
            clearInterval(intervalId);
            setIsUserlogued(false)
        }else{
            setIsUserlogued(true)
        }
    }

        

    return {userData, isUserlogued}

}