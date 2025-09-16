import { useDispatch } from 'react-redux'
import { ReactComponent as ExitSvg }  from '../../assets/svg/exit.svg'
import { useUser } from '../../Hooks'
import { logOut } from '../../store/slices/loginSlices'

import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../../shared/storage'
import './TopMenu.scss'

export const TopMenu = () => {
    const userData = useUser()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handlerExitClick = () => {
        dispatch(logOut())
        clearLocalStorage()
        navigate('/admin/login')

    }

    const getUsuario = () => {
        if(userData.first_name && userData.last_name){
            return userData.first_name + ' ' + userData.last_name
        }else if(userData.email){
            return userData.email
        }else{
            return 'usuario'
        }
    }

    
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Rest App</a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Admin</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <div className="d-flex" role="search">
                <label className="lbl-user_name" htmlFor="">Hola, {getUsuario()}</label>
                <ExitSvg onClick={handlerExitClick} fill="black#" className="exit-icon"/>
            </div>
            </div>
        </div>
    </nav>
  )
}

