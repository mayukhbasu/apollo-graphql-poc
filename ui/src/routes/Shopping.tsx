import React, {Fragment} from 'react';
import NavbarApp from '../core/Navbar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import './Shopping.css'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, Row, Col, CardFooter } from 'reactstrap';
import ProductCard from '../core/ProductCard';

const Shopping = (props:any) => {
    return (
        <Container style={{marginTop:'5rem'}}>
            <Row>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </Row>
        </Container>
    )
}

export default Shopping;