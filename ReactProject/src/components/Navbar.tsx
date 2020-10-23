import React, {ReactElement, useContext} from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { User } from '../database/User';
import {ThemeContext} from "./contexts/ThemeProvider";
import {LanguageContext} from "./contexts/LanguageProvider";
interface Props {
    curUser: User | null;
    logout: () => void;
}

export default function Navbar({curUser, logout}: Props): ReactElement {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

    const showCart = (user : User | null) => {
        if (user) {
            return <span>
                <Link to='/cart'>Cart</Link>
            </span>
        }
    }

    const showLogout = (user : User | null) => {
        if (user) {
            return <span onClick={() => logout()}>
                Logout
            </span>
        }
    }

    const showLogin = (user: User | null) => {
        if (!user) {
            return <span>
                <Link to='/auth'> Login </Link>
            </span>
        }
    }

    const showReg = (user: User | null) => {
        if (!user) {
            return <span>
                <Link to='/register'> Register </Link>
            </span>
        }
    }

    return (
        <nav className="navbar navbar-expand-lg px-4 sticky ">
        <div className='container'>
            <div className="collapse navbar-collapse navbar-nav mx-auto text-capitalize" id="myNav">
                <a className="navbar-brand" href="#"><img src="img/logo.svg" alt="" /></a>
                <Link to='/store' className="nav-item active nav-link"> Store </Link>
                <Link to='/main' className="nav-item active nav-link"> Home </Link>
            </div>

            <div className="nav-info-items d-none d-lg-flex ">
                <div className="nav-info align-items-center d-flex justify-content-between mx-lg-5">
                    {/*<span className="info-icon mx-lg-3">*/}
                    {/*<p className="mb-0">+7777-777-77-77</p>*/}
                    {/*    </span>*/}
                </div>
            </div>

            <div className="navbar-nav text-capitalize">
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    <span className="cart-info__icon mr-lg-3">
                        {showLogin(curUser)}
                    </span>
                </div>
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    <span className="cart-info__icon mr-lg-3">
                        {showReg(curUser)}
                    </span>
                </div>
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    {showCart(curUser)}
                </div>
                <div id="cart-info" className="nav-info align-items-center cart-info d-flex justify-content-between
                border-0">
                    {showLogout(curUser)}
                </div>

                    <div onClick={toggleLanguage} style={{
                        // border: "2px solid black", borderRadius: "5px",
                        border: "0",
                        backgroundColor: "white",
                        // borderColor: "#4CAF50",
                        color: "green",
                        padding: "14px 28px",
                        fontSize: "16px",
                        width: "10%",
                        textAlign: "center",
                        margin: "5px",
                        cursor: "pointer"}}>
                        {language === 'EN' ? 'RU' : 'EN'}
                    </div>
                    <div onClick={toggleTheme} className="cart-info__icon mr-lg-3" style={{
                                // border: "2px solid black", borderRadius: "5px",
                                border: "0",
                                backgroundColor: "white",
                                // borderColor: "#4CAF50",
                                color: "green",
                                padding: "14px 28px",
                                fontSize: "16px",
                                width: "10%",
                                textAlign: "center",
                                margin: "5px",
                                cursor: "pointer"}}>
                        {theme === 'light' ? 'dark' : 'light'}
                    </div>
            </div>
        </div>
        </nav>
    )
}