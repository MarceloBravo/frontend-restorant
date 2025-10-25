import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../shared/storage'
import { logOut } from '../store/slices/loginSlices'
import { useNavigate, useLocation } from 'react-router-dom'
import { clearLocalStorage } from '../shared/storage'
import { isTokenExpired, parseJwt } from '../shared'
import { getUserById } from '../axios/users'
import { UserClass } from '../class/UserClass';


export const useUserSession = (): { userData: UserClass | null, isUserlogued: boolean} => {
    const [ userData, setUserData ] = useState<UserClass | null>(null)
    const [ intervalId, setIntervalId ] = useState<NodeJS.Timeout | null>(null)
    const [ isUserlogued, setIsUserlogued] = useState<boolean>(false)
    const [ userId, setUserId ] = useState<string | null>(null)
    const accessToken = getLocalStorage('access')
    const user = useSelector<unknown, any>((state: any) => state.users.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const interval = 5000

    useEffect(() => {
        if(!accessToken) finalizarSession()

        const tokenData: any = parseJwt(accessToken)
        if(tokenData?.user_id){
            setUserId(tokenData.user_id)
            dispatch(getUserById(tokenData.user_id, accessToken) as any)
        }else{
            finalizarSession()
        }
        // eslint-disable-next-line
    },[])
    

    useEffect(()=> {
        if(user && userId && user.id === parseInt(userId)){
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
        finalizarSession();
        // eslint-disable-next-line
    },[isUserlogued])

    const finalizarSession = (): void => {
        const tokenValido: boolean = (!accessToken || isTokenExpired(accessToken) === false);
        console.log( isTokenExpired(accessToken) ? 'Token valido' : 'Token expirado')
        if(isUserlogued === true && tokenValido === false && location.pathname !== '/admin/login'){
            dispatch(logOut())
            clearLocalStorage()
            navigate('/admin/login')
            if(intervalId)clearInterval(intervalId);
            setIsUserlogued(false)
        }else{
            if(accessToken && tokenValido === true){
                setIsUserlogued(true)
            }
        }
    }

        

    return {userData, isUserlogued}

}