import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut} from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { LogOut, reset } from "../features/authSlice"

export default function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth)

    const logOut = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/")
    }
    
    return <>
        <aside className="menu has-shadow pl-3">
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li>
                    <NavLink to={"/dashboard"}><IoHome /> Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/product"}><IoPricetag /> Product</NavLink>
                </li>
            </ul>
            {
                user && user.role === "admin" && (
                    <div>
                        <p className="menu-label">
                            Admin
                        </p>
                        <ul className="menu-list">
                            <li>
                                <NavLink to={"/user"}> <IoPerson /> Users</NavLink>
                            </li>
                        </ul>
                    </div>
                )
            }
            <p className="menu-label">
                Setting
            </p>
            <ul className="menu-list">
                <li>
                    <button onClick={logOut} className="button is-white"><IoLogOut />LogOut</button>
                </li>
            </ul>
        </aside>
    </>
}