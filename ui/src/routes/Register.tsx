import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Container, Row, Col, Button } from 'reactstrap';
import gql from 'graphql-tag';
import {useMutation } from '@apollo/react-hooks';
import ConfirmEmail from '../UI/Modal';

const REGISTER_QUERY = gql`
    mutation Register($email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!){
        register(email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName){
            path
            message
        }
    }
`

const Register = (props:any) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerQuery] = useMutation(REGISTER_QUERY);


    const toggle = () => {
        setModal(!modal)
    }
    const register = async (event:any) => {
        event.preventDefault();
        const response:any = await registerQuery({variables: {
            email, password, confirmPassword, firstName, lastName
        }})
        
        if(response.data.register){
            console.log(response.data.register[0].message);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setModal(true);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
        }
        
    }
    return (
        <Container className="mt-5">
            <Form onSubmit={register}>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input type="text" name="firstName" 
                        id="firstName" 
                        value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label for="exampleEmail">Last Name</Label>
                        <Input type="text" name="lastName" 
                        id="lastName" 
                        value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" 
                        id="exampleEmail" 
                        value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label for="exampleEmail">Password</Label>
                        <Input type="password" name="password" id="password" 
                        value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <FormGroup>
                        <Label for="exampleEmail">Confirm Password</Label>
                        <Input type="password" name="cpassword" id="cpassword"
                        value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Button color="primary" size="sm" block>Register</Button>
                </Col>
            </Row>
            </Form>
            <ConfirmEmail modal={modal} toggle={toggle} history={props.history}/>
        </Container>
        
    )
}

export default Register;