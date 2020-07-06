import React, {Fragment} from 'react';
import NavbarApp from '../core/Navbar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import './Shopping.css'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, Row, Col, CardFooter } from 'reactstrap';
import ProductCard from '../core/ProductCard';


const GET_PRODUCTS = gql`
        {
            viewAllProducts{
                title
                category
                price
                url
            }
        }
    `
const Shopping = (props:any) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.viewAllProducts);
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