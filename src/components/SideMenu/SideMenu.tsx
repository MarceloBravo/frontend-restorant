import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import './SideMenu.scss'

export const SideMenu = (props: {selectedMenu: string}) => {
    const selectedMenu = props.selectedMenu
    
  return (
    <ul className="nav flex-column side-menu">        
        <li className="nav-item">
            <NavLink className={"nav-link active " + (selectedMenu === 'home' ? 'mnuActive': '')} to={'/admin/home'}  aria-current="page" ><Icon name='home' />Pedidos</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={"nav-link " + (selectedMenu === 'mesas' ? 'mnuActive': '')} to={"/admin/mesas"} ><Icon name='table' />Mesas</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={"nav-link " + (selectedMenu === 'pagos' ? 'mnuActive': '')} to={"/"} ><Icon name='history' />Historial de pagos</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={"nav-link " + (selectedMenu === 'categorias' ? 'mnuActive': '')} to={"/admin/categorias"} ><Icon name='folder' />Categorías</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={"nav-link " + (selectedMenu === 'productos' ? 'mnuActive': '')} to={"/admin/productos"} ><Icon name='cart' />Productos</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className={"nav-link " + (selectedMenu === 'usuarios' ? 'mnuActive': '')} to={"/admin/users"} ><Icon name='users' />Usuarios</NavLink>
        </li>
    </ul>
  )
}
