import { TopMenu, SideMenu } from '../../../components'
import './AdminHome.scss'

export const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <TopMenu />
      <div className="admin-home-body">
        <SideMenu selectedMenu={'home'}/>
        <div className="main-container">Este es Admin Home</div>
      </div>
    </div>
  )
}

export default AdminHome
