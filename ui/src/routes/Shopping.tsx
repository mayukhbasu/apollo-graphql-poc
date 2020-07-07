import React, {useContext} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import './Shopping.css'
import { Container, Row} from 'reactstrap';
import ProductCard from '../core/ProductCard';
import UserInfoContext from '../context/UserInfoContext';


const GET_PRODUCTS = gql`
        {
            viewAllProducts{
                title
                category
                price
                url
                id
            }
        }
    `
const Shopping = (props:any) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const userInfo = useContext(UserInfoContext);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const allProducts = data.viewAllProducts
    return (
        <Container style={{marginTop:'5rem'}}>
            <Row>
                {
                    allProducts.map((product, key) => <ProductCard key={key} product={product}></ProductCard>)
                }
            </Row>
        </Container>
    )
}

export default Shopping;