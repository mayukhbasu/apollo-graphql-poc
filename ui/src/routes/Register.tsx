import React, {Component} from 'react';
import { Button, FormGroup, Label, Input,Container, Row, Col, Form } from 'reactstrap';

class Register extends Component{
    state = {
        email: "",
        password: "",
        confirmPassword: ""
    }

    setValue = (event:any) => {
        event.persist()
        console.log(event.target.id);
        if(event.target.id === 'exampleEmail') {
            this.setState({
                email: event.target.value
            })
        }

        if(event.target.id === 'examplePassword') {
            this.setState({
                password: event.target.value
            })
        }

        if(event.target.id === 'cpassword') {
            this.setState({
                confirmPassword: event.target.value
            })
        }
    }

    submit = () => {
        console.log(this.state);
    }
    render(){
        return (
            <Container className="mt-4">
            <Form>
                <Row>
                <Col xs="6">
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail"
                    onChange={this.setValue}/>
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col xs="6">
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" 
                    onChange={this.setValue}/>
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col xs="6">
                <FormGroup>
                    <Label for="cpassword">Confirm Password</Label>
                    <Input type="password" name="cpassword" id="cpassword"
                    onChange={this.setValue}/>
                </FormGroup>
                </Col>
                </Row>
                <Button color="primary" size="sm" onClick={this.submit}>Submit</Button>{' '}
                <Button color="warning" size="sm">Reset</Button>{' '}
                </Form>
            </Container>
            
        )
    }
}

export default Register;
