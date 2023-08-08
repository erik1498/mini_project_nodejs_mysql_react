import React from "react";
import { NavLink } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut} from "react-icons/io5"

export default function Sidebar() {
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
            <p className="menu-label">
                Admin
            </p>
            <ul className="menu-list">
                <li>
                    <NavLink to={"/user"}> <IoPerson /> Users</NavLink>
                </li>
            </ul>
            <p className="menu-label">
                Setting
            </p>
            <ul className="menu-list">
                <li>
                    <button className="button is-white"><IoLogOut />LogOut</button>
                </li>
            </ul>
        </aside>
    </>
}