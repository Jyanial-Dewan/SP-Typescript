import logo from "../images/Supplier-Portal.jpg"
import {NavLink} from "react-router-dom"
import { CiViewTable } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className='bg-slate-100 shadow-md w-full fixed'>
        <div className="flex justify-between items-center w-[86%] h-[4rem] mx-auto">
            <img src={logo} alt="Logo" className="w-[4rem]"/>
            <div className="flex gap-4">
                <NavLink to={'/departmets'} className={({isActive}) => isActive? "text-2xl text-teal-400" : "text-2xl"}>
                    <CiViewTable/>
                </NavLink>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar

