import React, { useReducer } from 'react';
import './ProductForm.css'
import { Container, Row, Col, Form, FormGroup, Input, Label, Card, CardBody, CardTitle, Button } from "reactstrap";

const initialProductState = {
    title: '',
    price: '',
    category: '',
    url: ''
};
const reducer = (state:any, {field,value}:any) => {
    return {
        ...state,
        [field]: value
    }
}
const ProductForm = (props:any) => {
    const [state, dispatch] = useReducer(reducer, initialProductState);
    const onChange = (e:any) => {
        dispatch({field: e.target.name, value: e.target.value })
    }
    const submit = (event:any) => {
        event.preventDefault();
        props.submit(state);
    }
    return (
        <Container style={{padding: '90px'}}>
        <Card>
            <CardTitle style={{padding: '10px', backgroundColor:'lightgrey'}}>
                Add New Product
            </CardTitle>
            <CardBody>
            <Row>
                <Col md="6">
                    <Form onSubmit={submit}>
                    <FormGroup row>
                        <Label for="title" md={6}>Title</Label>
                            <Col md={6}>
                            <Input type="text" name="title" id="title" value={state.title}
                            onChange={onChange}/>
                            </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Form>
                    <FormGroup row>
                        <Label for="price" sm={6}>Price</Label>
                            <Col sm={6}>
                            <Input type="number" name="price" id="price" value={state.price}
                            onChange={onChange}/>
                            </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Form>
                    <FormGroup row>
                        <Label for="category" sm={6}>category</Label>
                            <Col sm={6}>
                            <Input type="text" name="category" id="category" value={state.category}
                            onChange={onChange}/>
                            </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Form>
                    <FormGroup row>
                        <Label for="url" sm={6}>Image URL</Label>
                            <Col sm={6}>
                            <Input type="url" name="url" id="url" value={state.url}
                            onChange={onChange}/>
                            </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Form>
                    <FormGroup row>
                    <Label for="category" sm={6}></Label>
                            <Col sm={6}>
                            <Button type="button" onClick={submit}>Submit</Button>
                            </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
            </CardBody>
            
        </Card>
            
        </Container>
    )
}

export default ProductForm;