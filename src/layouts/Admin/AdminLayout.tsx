import { Outlet } from "react-router-dom";
import { SideMenu, TopMenu } from "../../components";
import { useUserSession } from "../../Hooks";
import "./AdminLayout.scss"

export default function AdminLayout(props: {menu: string}): React.ReactNode {
  const { isUserlogued } = useUserSession()

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
