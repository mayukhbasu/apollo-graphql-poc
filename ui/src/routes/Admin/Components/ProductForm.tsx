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
                <CardTitle style={{padding: '15px', backgroundColor:'lightgrey'}}>Add new product</CardTitle>
            
            <CardBody>
                <Form onSubmit={submit}>
                <FormGroup row>
                    <Label md={4} for="exampleEmail">Title</Label>
                    <Col md={6}>
                        <Input type="text" name="title"
                        id="title" 
                        value={state.title} onChange={onChange}/>
                    </Col>
                    
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" md={4}>Price</Label>
                    <Col md={6}>
                        <Input type="number" name="price"
                        id="price" 
                        value={state.price} onChange={onChange}/>
                    </Col>
                    
                </FormGroup>
                <FormGroup row>
                    <Label for="category" md={4}>Category</Label>
                    <Col md={6}>
                        <Input type="text" name="category"
                        id="category" 
                        value={state.category} onChange={onChange}/>
                    </Col>
                    
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" md={4}>Image url</Label>
                    <Col md={6}>
                        <Input type="text" name="url"
                        id="url" 
                        value={state.url} onChange={onChange}/>
                    </Col>
                    
                </FormGroup>
                <FormGroup row style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <Button color="primary" block>Submit</Button>
                </FormGroup>
                </Form>
            </CardBody>
            </Card>
        </Container>
    )
}

export default ProductForm;