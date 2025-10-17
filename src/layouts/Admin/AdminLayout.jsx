import { Outlet } from "react-router-dom";
import { SideMenu, TopMenu } from "../../components";
import { useUserSession } from "../../Hooks";
import "./AdminLayout.scss"

export default function AdminLayout(props) {
  const { isUserlogued } = useUserSession()

  console.log(isUserlogued ? 'Está logueado' : 'No está logueado')
  if(!isUserlogued) return

  return  (
        <div className="admin-home-container">
          <TopMenu />
          <div className="admin-home-body">
            <SideMenu selectedMenu={props.menu}/>
            <Outlet/> {/* Renderiza el componente hijo */}
          </div>
        </div>
  )
}
