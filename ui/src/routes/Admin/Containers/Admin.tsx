import React from 'react';
import ProductForm from '../Components/ProductForm';
import NavbarApp from '../../../core/Navbar';

const Admin = (props:any) => {
    const submit = (data:any) => {
        console.log(data);
    }
    
    return (
        <React.Fragment>
            <NavbarApp/>
            <ProductForm submit={submit}/>
        </React.Fragment>
        
    )
}

export default Admin;