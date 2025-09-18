import { Outlet } from "react-router-dom";
import { SideMenu, TopMenu } from "../../components";
import "./AdminLayout.scss"

export default function AdminLayout(props) {
    
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
