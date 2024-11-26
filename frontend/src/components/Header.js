import React, { useEffect, useState } from 'react'
import "./header.css"
import { NavLink } from "react-router-dom"
import axios from "axios"
const Header = () => {
    const [userData, setUserData] = useState({})

    const getUser = async () => {

        try {
            const response = await axios.get("http://localhost:3001/login/success", { withCredentials: true })
            setUserData(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(userData)
    useEffect(() => {
        getUser()
    }, [])

    const logout = () => {
        window.open("http://localhost:3001/logout", "_self")
    }
    return (
        <header>
            <nav>
                <div className='left'>
                    <h1>Tushar Shitole</h1>
                </div>
                <div className='right'>
                    <ul>
                        <li>
                            <NavLink to={"/"}>
                                Home
                            </NavLink>
                        </li>
                        {
                            Object?.keys(userData)?.length > 0 ? (
                                <>
                                    <li style={{ color: 'black', fontWeight: "bold" }}>{userData?.displayName}</li>
                                    <li>
                                        <NavLink to={"/dashboard"}>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li onClick={logout}>Log out</li>
                                    <li>
                                        <img src={userData?.image} style={{ width: "50px", borderRadius: "50%" }} />
                                    </li>
                                </>
                            ) :
                                <li>
                                    <NavLink to={"/login"}>
                                        Login
                                    </NavLink>
                                </li>
                        }
                    </ul>
                </div>
            </nav >
        </header >
    )
}

export default Header