import React from 'react';

const NavbarApp = (props:any) => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top mb-5">
            <div className="container">
                <a href="/" className="navbar-brand">Oshop<i className="fa fa-shopping-bag ml-2"aria-hidden="true"></i></a>
            </div>
        </nav>
    )
}

export default NavbarApp;