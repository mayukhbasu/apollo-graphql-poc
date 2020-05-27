import React from 'react';
import ProductForm from '../Components/ProductForm';
import NavbarApp from '../../../core/Navbar';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_PRODUCT_QUERY = gql`
    mutation addProduct($title: String!,$price: Int!, $category: String!, $url: String!){
        addProduct(title: $title, price: $price, category: $category, url: $url){
            message
        }
    }
`

const Admin = (props:any) => {
    const [addProductQuery] = useMutation(ADD_PRODUCT_QUERY);
    const submit = async (data:any) => {
        // const response = await addProductQuery({variables: {
        //     email: 
        // }})
        const {title, price, category, url} = data;
        let priceInt = parseInt(price);
        const response = await addProductQuery({variables: {title, price: priceInt, category, url}});
        console.log(response);
    }
    
    return (
        <React.Fragment>
            <NavbarApp/>
            <ProductForm submit={submit}/>
        </React.Fragment>
        
    )
}

export default Admin;