import React , {useState} from 'react';
import { Container, Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import NavbarApp from '../UI/Navbar';

const LOGIN_QUERY = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            user{
                firstName
            }
            message
        }
    }
`

const Login = (props:any) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginQuery] = useMutation(LOGIN_QUERY);
    const submit = async (event:any) => {
        event.preventDefault();
        const response = await loginQuery({variables: {email, password}});
        console.log(response);
    }
    return (
        <React.Fragment>
            <NavbarApp/>
        
        <Container className="mt-5">
        
        <Form onSubmit={submit}>
        <Row>
            <Col sm="6">
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" 
                    id="exampleEmail" placeholder="with a placeholder" 
                    value={email} onChange={(event) => setEmail(event.target.value)}/>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col sm="6">
                <FormGroup>
                    <Label for="exampleEmail">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="with a placeholder" 
                    value={password} onChange={(event) => setPassword(event.target.value)}/>
                </FormGroup>
            </Col>
        </Row>
        
        <Row>
            <Col sm="6">
                <Button color="primary" size="sm" block>Login</Button>
            </Col>
        </Row>
        </Form>
        
    </Container>
    </React.Fragment>
    
    )
}

export default Login;